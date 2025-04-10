import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
 import userRoutes from './routes/userRoutes';
// import productRoutes from '../routes/productRoutes';

dotenv.config();  // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando ');
});

// Usar las rutas de la API
 app.use('/api/users', userRoutes);   // Ruta para los usuarios
// app.use('/api/products', productRoutes); // Ruta para los productos

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