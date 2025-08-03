import dotenv from 'dotenv';
dotenv.config(); 
import express, { Request, Response } from 'express';
import cors from 'cors';

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

// Ruta de prueba simple
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

// Ruta de prueba para productos
app.get('/api/products', (req: Request, res: Response) => {
  res.json([
    {
      _id: '1',
      name: 'Test Product',
      price: 100,
      description: 'Test product for debugging'
    }
  ]);
});

// Solo iniciar el servidor si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para Vercel
export default app;