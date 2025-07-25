import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthButtons from "./AuthButtons";
import "./layout.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="flex">
      <div className="logo">
        <Link to="/" className="logo">
          <img src={isHome ? "/img/logoMB45-n.png" : "/img/logoMB45.png"}
            alt="logo MB45" />
        </Link>
      </div>
              <nav className="main-menu flex">
          <Link to="/furnitures" className="nav-item">FURNITURES</Link>
          <Link to="/dashboard?section=favorites" className="nav-item">FAVORITES</Link>
          
        </nav>
      <nav className="right-menu flex">
        <Link to="/Dashboard" className="nav-item" title="Profile">
          <img src="/img/i-user.png"  alt="User Profile" className="icon-main-menu" />
        </Link>
        <Link to="/ShoppingList" className="nav-item" title="Shopping Car">
          <img src="/img/i-car.png" alt="Shopping Car" className="icon-main-menu" />
        </Link>
        <div className="logout-button">
          {user ? (
            <button 
              onClick={handleLogout} 
              className={isHome ? "button-1 bt-black margin-b" : "button-1 bt-orange margin-b"}
            >
              Logout
            </button>
          ) : (
            <AuthButtons />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
