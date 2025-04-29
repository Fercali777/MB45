import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await api.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Guardar token y datos de usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log('Token guardado:', localStorage.getItem("token"));

      // Redirección según el rol
      if (data.user.role === 'seller') {
        navigate('/dashboard-seller');
      } else {
        navigate('/dashboard-buyer');
      }

    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error al iniciar sesión';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleLogin} className="">
    <div className="grid-1-col-form">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      
        
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
         
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
       
          <label className="block text-sm font-medium">Pasword</label>
          <input
            type="password"
          
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
       
       </div>
        <button type="submit" className="button-1 bt-orange margin-b">  Entrar  </button>
      
    
    </form>
  );
};

export default Login;