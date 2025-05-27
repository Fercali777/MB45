import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mb-45-mongo-db.vercel.app/api/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;