import express from 'express';
import { Request, Response } from 'express';
import { User } from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
          // name, email, phone number, password, address, city, country, postalCode,  role:
  const { name, email, password, phone, address, city, country, postCode, role } = req.body;
console.log (req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(409).json({ message: 'User already created' });
    }
else{
    const newUser = new User({ name, email, password, phone, address, city, country, postCode, role });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });}
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
