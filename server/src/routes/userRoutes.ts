import express from 'express';
import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

//  Registro
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, phone, address, city, country, postCode, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
    }
else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phone, address, city, country, postCode, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address,
        city: newUser.city,
        country: newUser.country,
        postCode: newUser.postCode,
      },
      token,
    });
};

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) res.status(404).json({ message: 'User not found' });
else{
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)  res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    res.status(200).json({
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        phone: existingUser.phone,
        address: existingUser.address,
        city: existingUser.city,
        country: existingUser.country,
        postCode: existingUser.postCode,
      },
      token,
    });
  }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Ruta para obtener usuario actual con token


router.get('/me', async (req: Request, res: Response) => {
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
res.status(200).json({
  user: {
    uid: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
    address: user.address,
    city: user.city,
    country: user.country,
    postCode: user.postCode,
  },
});
      }
    } catch (error: any) {
      console.error('Token error:', error.message || error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }
});

router.put('/update', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token missing' });
  } else {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const updates = req.body;

      const updatedUser = await User.findByIdAndUpdate(decoded.id, updates, { new: true });

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({
          user: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            address: updatedUser.address,
            city: updatedUser.city,
            country: updatedUser.country,
            postCode: updatedUser.postCode,
          },
        });
      }
    } catch (err: any) {
      console.error('Update error:', err.message);
      res.status(401).json({ message: 'Invalid token' });
    }
  }
});



export default router;

