import dotenv from 'dotenv';
dotenv.config(); 
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes'; 
import shoppingRoutes from "./routes/shoppingRoutes";



const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS para permitir conexión con frontend
app.use(cors({
  origin: ['https://mb-45-mongo-db-rg2t.vercel.app', 'http://localhost:5173'],
  credentials: true,
}));

// Rutas
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/shopping", shoppingRoutes);



// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Server Working');
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