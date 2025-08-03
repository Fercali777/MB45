import dotenv from 'dotenv';
dotenv.config(); 
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes'; 
import shoppingRoutes from "./routes/shoppingRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS para permitir conexión con frontend
app.use(cors({
  origin: [
    'https://mb-45-mongo-db-rg2t.vercel.app', 
    'https://mb-45-mongo-db7j08by7-fernando-calixtos-projects.vercel.app',
    'https://mb-45-mongo-bs8odha01-fernando-calixtos-projects.vercel.app',
    'https://mb-45-us37.vercel.app',
    'https://mb-45-f46a.vercel.app',
    'https://mb-45-f46a-dt44p4wt4-fernando-calixtos-projects.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true,
}));

// Rutas
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/shopping", shoppingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/admin", adminRoutes);

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Server Working');
});

// Ruta de prueba para API
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

// Conexión con MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Error al conectar con MongoDB:', err);
  });