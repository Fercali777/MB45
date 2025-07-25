import express, { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { requireAdmin } from '../middleware/adminAuth';
import { cleanupProductReferences } from '../routes/productRoutes';
import mongoose from 'mongoose';

const router = express.Router();

// Todas las rutas requieren autenticación admin
router.use(requireAdmin);

// Obtener todos los productos (incluyendo eliminados)
router.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting all products:', error);
    res.status(500).json({ message: 'Error getting products' });
  }
});

// Obtener productos activos
router.get('/products/active', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    })
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting active products:', error);
    res.status(500).json({ message: 'Error getting active products' });
  }
});

// Obtener productos eliminados
router.get('/products/deleted', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isDeleted: true })
      .populate('seller', 'name email')
      .sort({ deletedAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting deleted products:', error);
    res.status(500).json({ message: 'Error getting deleted products' });
  }
});

// Eliminar producto (admin puede eliminar cualquier producto)
router.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Soft delete
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();

    // Limpiar referencias
    await cleanupProductReferences(id);

    res.status(200).json({ 
      message: 'Product deleted successfully by admin',
      product: {
        id: product._id,
        name: product.name,
        seller: product.seller
      }
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Restaurar producto eliminado
router.patch('/products/:id/restore', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.isDeleted) {
      return res.status(400).json({ message: 'Product is not deleted' });
    }

    product.isDeleted = false;
    product.deletedAt = undefined;
    await product.save();

    res.status(200).json({ 
      message: 'Product restored successfully',
      product: {
        id: product._id,
        name: product.name
      }
    });
  } catch (error) {
    console.error('Error restoring product:', error);
    res.status(500).json({ message: 'Error restoring product' });
  }
});

// Obtener todos los usuarios
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-password') // No incluir contraseñas
      .sort({ createdAt: -1 });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users' });
  }
});

// Obtener estadísticas generales
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    });
    const deletedProducts = await Product.countDocuments({ isDeleted: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const sellerUsers = await User.countDocuments({ role: 'seller' });
    const buyerUsers = await User.countDocuments({ role: 'buyer' });

    res.status(200).json({
      users: {
        total: totalUsers,
        admins: adminUsers,
        sellers: sellerUsers,
        buyers: buyerUsers
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        deleted: deletedProducts
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ message: 'Error getting statistics' });
  }
});

// Eliminar múltiples productos de prueba
router.delete('/products/cleanup/bulk', async (req: Request, res: Response) => {
  try {
    const { ids, names, categories } = req.body;
    
    let query: any = {};
    
    if (ids && ids.length > 0) {
      query._id = { $in: ids };
    } else if (names && names.length > 0) {
      query.name = { $in: names };
    } else if (categories && categories.length > 0) {
      query.category = { $in: categories };
    } else {
      // Por defecto, eliminar productos con "test" en el nombre
      query.name = { $regex: /test/i };
    }
    
    const productsToDelete = await Product.find(query);
    
    if (productsToDelete.length === 0) {
      return res.status(404).json({ message: 'No products found to delete' });
    }
    
    let deletedCount = 0;
    
    for (const product of productsToDelete) {
      if (!product.isDeleted) {
        product.isDeleted = true;
        product.deletedAt = new Date();
        await product.save();
        
        await cleanupProductReferences(product._id.toString());
        deletedCount++;
      }
    }
    
    res.status(200).json({ 
      message: `Successfully deleted ${deletedCount} products`,
      deletedProducts: productsToDelete.map(p => ({
        id: p._id,
        name: p.name,
        seller: p.seller
      }))
    });
  } catch (error) {
    console.error('Error bulk deleting products:', error);
    res.status(500).json({ message: 'Error bulk deleting products' });
  }
});

export default router; 