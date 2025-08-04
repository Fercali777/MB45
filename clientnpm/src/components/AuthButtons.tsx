import React from 'react';
import { useNavigate, useLocation } from 'react-router';

interface AuthButtonsProps {
  showLogin?: boolean;
  showRegister?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  showLogin = true, 
  showRegister = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  // Determine button classes based on current location
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const homeButtonClass = "button-1 bt-black margin-b";
  const homeButtonClass2 = "button-1 bt-grey margin-b";
  const defaultButtonClass = "button-1 bt-orange margin-b";
  const defaultButtonClass2 = "button-1 bt-black margin-b";

  return (
    <div className="flex gap-2">
      {showLogin && (
        <button 
          onClick={handleLoginRedirect} 
          className={isHome ? homeButtonClass : defaultButtonClass}
        >
          Login
        </button>
      )}
      {showRegister && (
        <button 
          onClick={handleRegisterRedirect} 
          className={isHome ? homeButtonClass2 : defaultButtonClass2}
        >
          Register
        </button>
      )}
    </div>
  );
};

export default AuthButtons; 