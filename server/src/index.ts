import dotenv from 'dotenv';
dotenv.config(); 
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

// Import routes
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import adminRoutes from './routes/adminRoutes';
import commentRoutes from './routes/commentRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import shoppingRoutes from './routes/shoppingRoutes';

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for production and development
const allowedOrigins = [
  'https://mb-45-mongo-db-rg2t.vercel.app', 
  'https://mb-45-mongo-db7j08by7-fernando-calixtos-projects.vercel.app',
  'https://mb-45-mongo-bs8odha01-fernando-calixtos-projects.vercel.app',
  'https://mb-45-us37.vercel.app',
  'https://mb-45-f46a.vercel.app',
  'https://mb-45-f46a-dt44p4wt4-fernando-calixtos-projects.vercel.app',
  'https://mb-45-mongo-db-git-main-fernando-calixtos-projects.vercel.app',
  'https://mb-45-f46a-ixz0f4bxx-fernando-calixtos-projects.vercel.app',
  'https://mb-45-f46a-cn462ak14-fernando-calixtos-projects.vercel.app',
  'https://mb-45-f46a-au3rl72cz-fernando-calixtos-projects.vercel.app',
  'https://mb-45-f46a-p8nn0kxy6-fernando-calixtos-projects.vercel.app',
  'https://mb-45-f46a-rdmoqdlcf-fernando-calixtos-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any Vercel domain for this project
    if (origin.includes('mb-45-f46a') || 
        origin.includes('mb-45-mongo-db') || 
        origin.includes('mb-45-us37') ||
        origin.includes('localhost')) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Routes
// API test route (moved to top for priority)
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    message: 'API is working',
    env: {
      hasMongoUri: !!process.env.MONGO_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      port: process.env.PORT
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', userRoutes); // Alias for backward compatibility
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/shopping', shoppingRoutes);



// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Only start server if not in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;