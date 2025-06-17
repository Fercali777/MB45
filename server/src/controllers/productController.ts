import { Request, Response } from "express";
import { Product } from "../models/Product";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string; 
}

export const addProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, category, price, stock, mainMaterial, color, width, height, depth, description } = req.body;

    // Validación simple
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" });
    }

    const user = req.user as JwtPayload;
    const sellerId = user._id;

    const newProduct = new Product({
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
  } catch (error: any) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: error.message || "Error del servidor" });
  }
};