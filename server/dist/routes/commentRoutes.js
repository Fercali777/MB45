"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Comment_1 = require("../models/Comment");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// GET comentarios por producto
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const comments = await Comment_1.Comment.find({ productId })
            .sort({ createdAt: -1 })
            .populate('userId', 'name');
        if (!comments || comments.length === 0) {
            res.status(404).json({ message: "No se encontraron comentarios para este producto" });
        }
        else {
            res.status(200).json(comments);
        }
    }
    catch (error) {
        console.error("Error al obtener comentarios:", error);
        res.status(500).json({ message: "Error al obtener comentarios" });
    }
});
// POST nuevo comentario
router.post('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { text } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token missing' });
    }
    else {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await User_1.User.findById(decoded.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            else {
                const newComment = new Comment_1.Comment({
                    userId: user._id,
                    productId,
                    text,
                    createdAt: new Date(),
                });
                await newComment.save();
                res.status(201).json(newComment);
            }
        }
        catch (error) {
            console.error("Error al crear comentario:", error);
            res.status(500).json({ message: "Error al crear comentario" });
        }
    }
});
exports.default = router;
