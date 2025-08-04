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
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    // Verificar autenticación
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Token missing or invalid format');
      res.status(401).json({ message: 'Token missing' });
      return;
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token ? 'Token present' : 'No token');

    // Verificar JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      console.log('Token decoded successfully:', decoded);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Buscar usuario
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found for ID:', decoded.id);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('User found:', { id: user._id, name: user.name, role: user.role });

    // Verificar que el usuario sea seller o admin
    if (user.role !== 'seller' && user.role !== 'admin') {
      console.log('User role not authorized:', user.role);
      res.status(403).json({ message: 'Only sellers and admins can add products' });
      return;
    }

    // Preparar datos del producto
    const imageUrl = req.file?.path || req.body.image;
    console.log('Image URL:', imageUrl);

    const productData = {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      mainMaterial: req.body.mainMaterial,
      color: req.body.color,
      width: req.body.width ? Number(req.body.width) : undefined,
      height: req.body.height ? Number(req.body.height) : undefined,
      depth: req.body.depth ? Number(req.body.depth) : undefined,
      description: req.body.description,
      image: imageUrl,
      seller: user._id,
    };

    console.log('Product data to save:', productData);

    // Validar datos requeridos
    if (!productData.name || !productData.category || !productData.price || !productData.stock) {
      console.log('Missing required fields');
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Crear y guardar producto
    const newProduct = new Product(productData);
    await newProduct.save();

    console.log('Product saved successfully:', newProduct._id);

    res.status(201).json({ 
      message: 'Product added successfully', 
      product: newProduct 
    });
  } catch (error) {
    console.error('Error en /add:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
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


export default router;
