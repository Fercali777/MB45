import express, { Request, Response } from 'express';
import Product from '../../models/Product';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Crear un nuevo producto
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock, images, material, dimensions } = req.body;
    const newProduct = new Product({ name, description, price, category, stock, images, material, dimensions });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

export default router;