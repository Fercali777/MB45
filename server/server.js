
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Error al conectar a MongoDB:', err);
  });