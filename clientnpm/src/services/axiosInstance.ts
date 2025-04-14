import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto si tienes otra URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Útil si usas cookies/sesiones
});

export default axiosInstance;