// server/routes/shoppingRoutes.ts
import express, { Request, Response } from "express";
import { isAuth } from "../middlewares/auth";
import { ShoppingItem } from "../models/ShoppingItem";
import { Product } from "../models/Product";
import mongoose from "mongoose";
import { start } from "repl";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  userId?: string;
}

// POST /api/shopping/add
router.post("/add", isAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { productId, quantity = 1 } = req.body;

  if (!req.userId) {
    res.status(401).json({ message: "No autorizado" });
    // No return
  }

  try {
    const existingItem = await ShoppingItem.findOne({
      userId: req.userId,
      productId: new mongoose.Types.ObjectId(productId),
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json({ message: "Cantidad actualizada en el carrito." });
      // No return
    } else {
      const newItem = new ShoppingItem({
        userId: req.userId,
        productId,
        quantity,
      });

      await newItem.save();
      res.status(201).json({ message: "Producto añadido al carrito." });
      // No return
    }
  } catch (err) {
    console.error("❌ Error al añadir producto al carrito:", err);
    res.status(500).json({ message: "Error del servidor" });
    // No return
  }
});

// GET /api/shopping
router.get("/", isAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "No autorizado" });
    // No return
  }

  try {
    const items = await ShoppingItem.find({ userId: req.userId }).populate("productId");
    res.json(items);
    // No return
  } catch (err) {
    console.error("❌ Error al obtener el carrito:", err);
    res.status(500).json({ message: "Error del servidor" });
    // No return
  }
});

// DELETE /api/shopping/:id
router.delete("/:id", isAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "No autorizado" });
    // No return
  }

  try {
    const item = await ShoppingItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      res.status(404).json({ message: "Producto no encontrado en el carrito." });
      // No return
    } else {
      res.json({ message: "Producto eliminado del carrito." });
      // No return
    }
  } catch (err) {
    console.error("❌ Error al eliminar producto del carrito:", err);
    res.status(500).json({ message: "Error del servidor" });
    // No return
  }
});

export default router;