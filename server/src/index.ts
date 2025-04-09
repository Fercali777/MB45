// Importación de dependencias
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando 🚀');
});

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI as string) // TypeScript no sabe si MONGO_URI está en el .env, entonces lo tratamos como string
  .then(() => {
    console.log(' Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error(' Error al conectar a MongoDB:', err);
  });