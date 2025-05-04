import { Link, useLocation } from "react-router";
import LogoutButton from "./LogoutButton";



const Header = () => {
  const location = useLocation();
const isHome = location.pathname === "/";
  return (
    <header className="flex">
      <div className="logo">
        <Link to="/" className="logo">
          <img src={isHome ? "img/logoMB45-n.png" : "img/logoMB45.png"}
            alt="logo MB45" />
        </Link>
      </div>
      <nav className="main-menu flex">
        <Link to="/fornitures" className="nav-item">FURNITURES</Link>
        <Link to="/contact" className="nav-item">CONTACT</Link>
        <Link to="/shopping-cart" className="nav-item">SHOPPING LIST</Link>
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/register" className="nav-item">Register</Link>
        <Link to="/Dashboard" className="nav-item">Dashboard</Link> 
      </nav>
      <nav className="right-menu flex">
        <Link to="/Dashboard" className="nav-item">
          <img src="img/i-user.png" alt="User Profile" className="icon-main-menu" />
        </Link>
        <Link to="/shopping-cart" title="Shopping Car">
          <img src="img/i-car.png" alt="Shopping Car" className="icon-main-menu" />
        </Link>
        <div className="logout-button"><LogoutButton /></div>
      </nav>
    </header>
  );
};

export default Header;
