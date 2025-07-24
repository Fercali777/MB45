import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./buttons.css";

const LoginLogoutButton = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  if (user) {
    return (
      <button onClick={handleLogout} className="button-1 bt-orange margin-b">
        Logout
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleLoginRedirect} className="button-1 bt-orange margin-b">
        Login
      </button>
      <button onClick={handleRegisterRedirect} className="button-1 bt-grey margin-b">
        Register
      </button>
    </div>
  );
};

export default LoginLogoutButton;