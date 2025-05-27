"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = require("../models/Product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("../config/cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
console.log("✅ productRoutes.ts cargado");
//  Multer with Cloudinary
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
const router = express_1.default.Router();
// Tipado del controlador, ya no es necesario definir el interface MulterRequest
const addProduct = async (req, res) => {
    console.log('Entrando a /api/products/add');
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token missing' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);
        const user = await User_1.User.findById(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log('Usuario encontrado:', user);
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);
        const imageUrl = req.file?.path;
        const productData = {
            ...req.body,
            image: imageUrl,
            seller: user._id,
        };
        console.log('Datos del producto a guardar:', productData);
        const newProduct = new Product_1.Product(productData);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    }
    catch (error) {
        console.error('Error en /add:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Ruta para agregar producto con una imagen
router.post('/add', upload.single('image'), addProduct);
// Obtener todos los productos
router.get('/', async (req, res) => {
    console.log("👉 Ruta /api/products fue accedida");
    try {
        const products = await Product_1.Product.find().populate('seller', 'name email');
        console.log("Todos los productos disponibles:", products); // ← esto
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
});
// Obtener producto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido:", id);
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.log("ID inválido");
        res.status(400).json({ message: "ID no válido" });
        return;
    }
    try {
        const product = await Product_1.Product.findById(id).populate('seller', 'name email');
        if (!product) {
            console.log("Producto no encontrado en la base de datos");
            res.status(404).json({ message: "Producto no encontrado" });
        }
        else {
            console.log("Producto encontrado:", product);
            res.status(200).json(product);
        }
    }
    catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ message: "Error al obtener producto" });
    }
});
// Obtener productos por ID de usuario (vendedor)
router.get('/seller/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const products = await Product_1.Product.find({ seller: userId }).populate('seller', 'name email');
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error al obtener productos del vendedor:", error);
        res.status(500).json({ message: "Error al obtener productos del vendedor" });
    }
});
// Eliminar producto por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'ID no válido' });
    }
    else {
        try {
            const deletedProduct = await Product_1.Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Producto eliminado correctamente' });
            }
        }
        catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ message: 'Error al eliminar producto' });
        }
    }
});
exports.default = router;
