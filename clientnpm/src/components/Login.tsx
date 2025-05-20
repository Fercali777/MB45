import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/dashboard');

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

        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="button-1 bt-orange margin-b">
        Entrar
      </button>
    </form>
  );
};

export default Login;