import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mb-45-mongo-db.vercel.app/api', // Cambia esto si tienes otra URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Útil si usas cookies/sesiones
});

export default axiosInstance;