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
    res.status(401).json({ message: "Unauthorized" });
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
      res.status(200).json({ message: "Quantity updated in cart." });
      // No return
    } else {
      const newItem = new ShoppingItem({
        userId: req.userId,
        productId,
        quantity,
      });

      await newItem.save();
      res.status(201).json({ message: "Product added to cart." });
      // No return
    }
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ message: "Server error" });
    // No return
  }
});

// GET /api/shopping
router.get("/", isAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    // No return
  }

  try {
    const items = await ShoppingItem.find({ userId: req.userId }).populate("productId");
    res.json(items);
    // No return
  } catch (err) {
    console.error(" Error getting cart:", err);
    res.status(500).json({ message: "EServer error" });
    // No return
  }
});

// DELETE /api/shopping/:id
router.delete("/:id", isAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    // No return
  }

  try {
    const item = await ShoppingItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      res.status(404).json({ message: "Product not found in the cart." });
      // No return
    } else {
      res.json({ message: "Product removed from cart." });
      // No return
    }
  } catch (err) {
    console.error("Error deleting product from cart:", err);
    res.status(500).json({ message: "Server error" });
    // No return
  }
});

export default router;