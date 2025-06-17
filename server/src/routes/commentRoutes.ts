import express, { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { start } from 'repl';

const router = express.Router();

// GET comentarios por producto
router.get('/:productId', async (req: Request<{ productId: string }>, res: Response) => {
  const { productId } = req.params;

  try {
    const comments = await Comment.find({ productId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');

    if (!comments || comments.length === 0) {
      res.status(404).json({ message: "No se encontraron comentarios para este producto" });
    } else {
      res.status(200).json(comments);
    }
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});

// POST nuevo comentario
router.post('/:productId', async (req: Request<{ productId: string }, {}, { text: string }>, res: Response) => {
  const { productId } = req.params;
  const { text } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token missing' });
  } else {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const newComment = new Comment({
          userId: user._id,
          productId,
          text,
          createdAt: new Date(),
        });

        await newComment.save();
        res.status(201).json(newComment);
      }
    } catch (error) {
      console.error("Error al crear comentario:", error);
      res.status(500).json({ message: "Error al crear comentario" });
    }
  }
});

export default router;