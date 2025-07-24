import { Link, useLocation } from "react-router";
import LogoutButton from "./LogOutButton";
import "./layout.css";



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
        <Link to="/furnitures" className="nav-item">FURNITURES</Link>
        
      </nav>
      <nav className="right-menu flex">
        <Link to="/Dashboard" className="nav-item" title="Profile">
          <img src="img/i-user.png"  alt="User Profile" className="icon-main-menu" />
        </Link>
        <Link to="/ShoppingList" className="nav-item" title="Shopping Car">
          <img src="img/i-car.png" alt="Shopping Car" className="icon-main-menu" />
        </Link>
        <div className="logout-button"><LogoutButton /></div>
      </nav>
    </header>
  );
};

export default Header;
