import dotenv from 'dotenv';
dotenv.config();  // Cargar variables de entorno
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';



const app = express(); // ✅ Esta línea debe ir antes de cualquier uso de `app`

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS para permitir conexión con frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Rutas
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);

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