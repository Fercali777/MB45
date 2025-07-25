import express, { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { ShoppingItem } from '../models/ShoppingItem';
import { Comment } from '../models/Comment';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { storage } from '../config/cloudinary'; 
import mongoose from 'mongoose';
console.log(" productRoutes.ts load");
//  Multer with Cloudinary
const upload = multer({ storage });

const router = express.Router();

// Función para limpiar referencias cuando se elimina un producto
export const cleanupProductReferences = async (productId: string) => {
  try {
    // Remover de favoritos de todos los usuarios
    await User.updateMany(
      { favorites: productId },
      { $pull: { favorites: productId } }
    );

    // Eliminar items del carrito que referencien este producto
    await ShoppingItem.deleteMany({ productId });

    // Eliminar comentarios del producto
    await Comment.deleteMany({ productId });

    console.log(`Cleaned up references for product ${productId}`);
  } catch (error) {
    console.error('Error cleaning up product references:', error);
  }
};

// Tipado del controlador, ya no es necesario definir el interface MulterRequest
const addProduct = async (req: Request, res: Response): Promise<void> => {
  console.log('Entrando a /api/products/add');

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('User found:', user);

    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    const imageUrl = req.file?.path;
    const productData = {
      ...req.body,
      image: imageUrl,
      seller: user._id,
    };

    console.log('Product data to save:', productData);

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error en /add:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Ruta para agregar producto con una imagen
router.post('/add', upload.single('image'), addProduct);

// Obtener todos los productos (solo los no eliminados)
router.get('/', async (req: Request, res: Response) => {
  console.log("👉 Ruta /api/products fue accedida");
  try {
    // Buscar productos que NO estén marcados como eliminados (incluye los que no tienen el campo)
    const products = await Product.find({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    }).populate('seller', 'name email');
    console.log("All products available:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Error getting products" });
  }
});

// Obtener producto por ID (solo si no está eliminado)
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("ID received:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ID");
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  try {
    const product = await Product.findOne({
      _id: id,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    }).populate('seller', 'name email');
    if (!product) {
      console.log("Product not found in the database");
      res.status(404).json({ message: "Product not found" });
    } else {
      console.log("Product found:", product);
      res.status(200).json(product);
    }
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Error getting product" });
  }
});


// Obtener productos por ID de usuario (vendedor)
router.get('/seller/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const products = await Product.find({ seller: userId }).populate('seller', 'name email');
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products from seller:", error);
    res.status(500).json({ message: "Error getting products from seller" });
  }
});

// Soft delete - Marcar producto como eliminado
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Soft delete - marcar como eliminado
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();

    // Llamar a la función de limpieza de referencias
    await cleanupProductReferences(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

// Restaurar producto eliminado
router.patch('/:id/restore', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.isDeleted) {
      return res.status(400).json({ message: "Product is not deleted" });
    }

    // Restaurar producto
    product.isDeleted = false;
    product.deletedAt = undefined;
    await product.save();

    res.status(200).json({ message: "Product restored successfully" });
  } catch (error) {
    console.error("Error restoring product:", error);
    res.status(500).json({ message: "Error restoring product" });
  }
});

// Ruta administrativa - Ver productos eliminados
router.get('/admin/deleted', async (req: Request, res: Response) => {
  try {
    const deletedProducts = await Product.find({ isDeleted: true })
      .populate('seller', 'name email')
      .sort({ deletedAt: -1 });

    res.status(200).json(deletedProducts);
  } catch (error) {
    console.error("Error getting deleted products:", error);
    res.status(500).json({ message: "Error getting deleted products" });
  }
});

// Ruta administrativa - Estadísticas de limpieza
router.get('/admin/stats', async (req: Request, res: Response) => {
  try {
    const totalDeleted = await Product.countDocuments({ isDeleted: true });
    const totalActive = await Product.countDocuments({ isDeleted: false });
    const recentlyDeleted = await Product.countDocuments({
      isDeleted: true,
      deletedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({
      totalDeleted,
      totalActive,
      recentlyDeleted,
      totalProducts: totalActive + totalDeleted
    });
  } catch (error) {
    console.error("Error getting product stats:", error);
    res.status(500).json({ message: "Error getting product stats" });
  }
});

// Ruta temporal para limpiar productos de prueba
router.delete('/admin/cleanup-test', async (req: Request, res: Response) => {
  try {
    const { names, categories } = req.body;
    
    let query: any = {};
    
    if (names && names.length > 0) {
      query.name = { $in: names };
    }
    
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }
    
    // Si no se especifica nada, eliminar productos con "test" en el nombre
    if (!names && !categories) {
      query.name = { $regex: /test/i };
    }
    
    const deletedProducts = await Product.find(query);
    
    if (deletedProducts.length === 0) {
      return res.status(404).json({ message: "No test products found" });
    }
    
    // Soft delete de los productos encontrados
    for (const product of deletedProducts) {
      product.isDeleted = true;
      product.deletedAt = new Date();
      await product.save();
      
      // Limpiar referencias
      await cleanupProductReferences(product._id.toString());
    }
    
    res.status(200).json({ 
      message: `Deleted ${deletedProducts.length} test products`,
      deletedProducts: deletedProducts.map(p => ({ id: p._id, name: p.name }))
    });
  } catch (error) {
    console.error("Error cleaning up test products:", error);
    res.status(500).json({ message: "Error cleaning up test products" });
  }
});


export default router;
