import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();  // Chage variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Core conect with frontend

app.use('/api/users', userRoutes);

app.use(cors({
  origin: 'http://localhost:5173', // Vite
  credentials: true,
}));


// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando ');
});

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI as string)  // Conexión con la base de datos
  .then(() => {
    console.log(' Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(' Error al conectar a MongoDB:', err);
  });