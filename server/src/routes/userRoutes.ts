import express, { Request, Response } from 'express';
import User from '../../models/User';

const router = express.Router();

// Crear un usuario
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, password, address, city, country, postalCode, role } = req.body;
    const newUser = new User({ name, email, phoneNumber, password, address, city, country, postalCode, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

export default router;