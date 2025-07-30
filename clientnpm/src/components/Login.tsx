import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { useAlertModal } from '../hooks/useAlertModal';
import AlertModal from './AlertModal';
import './forms.css';
import './buttons.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { alertState, showError, hideAlert } = useAlertModal();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await login(email, password);
      navigate('/furnitures');
    } catch (err: any) {
      console.error(err);
      // Extract error message from different possible sources
      let errorMessage = 'Login failed';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      showError('Login Error', errorMessage);
    }
  };

  const handleCloseAlert = () => {
    hideAlert();
    setError('');
  };

  return (
    <>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={handleCloseAlert}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        showCloseButton={true}
      />
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
    </>
  );
};

export default Login;