import express from 'express';
import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// GET all users (for testing)
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Registro
router.post('/register', async (req: Request, res: Response) => {
  console.log('🔍 Register route called');
  console.log('📝 Request body:', req.body);
  console.log('🔑 JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('🗄️ MONGO_URI exists:', !!process.env.MONGO_URI);
  
  const { name, email, password, phone, address, city, country, postCode, role } = req.body;

  try {
    console.log('🔍 Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists');
      return res.status(409).json({ message: 'User already exists' });
    }

    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('👤 Creating new user...');
    const newUser = new User({ name, email, password: hashedPassword, phone, address, city, country, postCode, role });
    await newUser.save();
    console.log('✅ User saved successfully');

    console.log('🎫 Generating JWT token...');
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    console.log('🎉 Registration successful');
    return res.status(201).json({
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
  } catch (error) {
    console.error('❌ Error registering user:', error);
    console.error('🔍 Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'Internal server error'
    });
  }
});

//  Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    return res.status(200).json({
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
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

//  Ruta para obtener usuario actual con token


router.get('/me', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing' });
  } else {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json({
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
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
});

router.put('/update', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing' });
  } else {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const updates = req.body;

      const updatedUser = await User.findByIdAndUpdate(decoded.id, updates, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.status(200).json({
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
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
});

export default router;

