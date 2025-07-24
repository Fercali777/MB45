import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router();

// Helper function to get user from token
const getUserFromToken = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token missing');
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Add product to favorites
router.post('/add/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const user = await getUserFromToken(req);

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Check if already in favorites
    if (user.favorites.includes(productId as any)) {
      res.status(400).json({ message: 'Product already in favorites' });
      return;
    }

    // Add to favorites
    user.favorites.push(productId as any);
    await user.save();

    res.status(200).json({ message: 'Product added to favorites', favorites: user.favorites });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
});

// Remove product from favorites
router.delete('/remove/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const user = await getUserFromToken(req);

    // Remove from favorites
    user.favorites = user.favorites.filter((fav: any) => fav.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from favorites', favorites: user.favorites });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
});

// Get user favorites
router.get('/my-favorites', async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req);
    // Populate favorites with product details
    const populatedUser = await User.findById(user._id).populate('favorites');
    if (!populatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ favorites: populatedUser.favorites });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
});

// Check if product is in favorites
router.get('/check/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const user = await getUserFromToken(req);
    const isFavorite = user.favorites.includes(productId as any);
    res.status(200).json({ isFavorite });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
});

export default router; 