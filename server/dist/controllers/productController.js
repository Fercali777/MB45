"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const Product_1 = require("../models/Product");
const addProduct = async (req, res) => {
    try {
        const { name, category, price, stock, mainMaterial, color, width, height, depth, description } = req.body;
        // Validación simple
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No se ha subido ninguna imagen" });
        }
        const user = req.user;
        const sellerId = user._id;
        const newProduct = new Product_1.Product({
            name,
            category,
            price,
            stock,
            mainMaterial,
            color,
            width,
            height,
            depth,
            description,
            image: req.file.path, // la URL de la imagen subida a Cloudinary
            seller: sellerId,
        });
        await newProduct.save();
        res.status(201).json({ message: "Producto creado correctamente", product: newProduct });
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: error.message || "Error del servidor" });
    }
};
exports.addProduct = addProduct;
