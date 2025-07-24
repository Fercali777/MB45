"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/routes/shoppingRoutes.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const ShoppingItem_1 = require("../models/ShoppingItem");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
// POST /api/shopping/add
router.post("/add", auth_1.isAuth, async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    if (!req.userId) {
        res.status(401).json({ message: "Unauthorized" });
        // No return
    }
    try {
        const existingItem = await ShoppingItem_1.ShoppingItem.findOne({
            userId: req.userId,
            productId: new mongoose_1.default.Types.ObjectId(productId),
        });
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            res.status(200).json({ message: "Quantity updated in cart." });
            // No return
        }
        else {
            const newItem = new ShoppingItem_1.ShoppingItem({
                userId: req.userId,
                productId,
                quantity,
            });
            await newItem.save();
            res.status(201).json({ message: "Product added to cart." });
            // No return
        }
    }
    catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).json({ message: "Server error" });
        // No return
    }
});
// GET /api/shopping
router.get("/", auth_1.isAuth, async (req, res) => {
    if (!req.userId) {
        res.status(401).json({ message: "Unauthorized" });
        // No return
    }
    try {
        const items = await ShoppingItem_1.ShoppingItem.find({ userId: req.userId }).populate("productId");
        res.json(items);
        // No return
    }
    catch (err) {
        console.error(" Error getting cart:", err);
        res.status(500).json({ message: "EServer error" });
        // No return
    }
});
// DELETE /api/shopping/:id
router.delete("/:id", auth_1.isAuth, async (req, res) => {
    if (!req.userId) {
        res.status(401).json({ message: "Unauthorized" });
        // No return
    }
    try {
        const item = await ShoppingItem_1.ShoppingItem.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!item) {
            res.status(404).json({ message: "Product not found in the cart." });
            // No return
        }
        else {
            res.json({ message: "Product removed from cart." });
            // No return
        }
    }
    catch (err) {
        console.error("Error deleting product from cart:", err);
        res.status(500).json({ message: "Server error" });
        // No return
    }
});
exports.default = router;
