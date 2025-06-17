import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Usar variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Útil si usas cookies/sesiones
});

export default axiosInstance;