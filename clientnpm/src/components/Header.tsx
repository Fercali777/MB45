import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAlertModal } from "../hooks/useAlertModal";
import AlertModal from "./AlertModal";
import AuthButtons from "./AuthButtons";
import "./layout.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { alertState, showInfo, hideAlert } = useAlertModal();
  const isHome = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleFavoritesClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      showInfo(
        'Login Required',
        'You need to be logged in to view your favorites. Please log in to continue.'
      );
    }
  };

  const handleLoginRedirect = () => {
    hideAlert();
    navigate('/login');
  };

  return (
    <>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={handleLoginRedirect}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        showCloseButton={true}
      />
      <header className="flex">
        <div className="logo">
          <Link to="/" className="logo">
            <img src={isHome ? "/img/MB45n.svg" : "/img/MB45.svg"}
              alt="logo MB45" />
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <nav className="main-menu flex desktop-menu">
          <Link to="/furnitures" className="nav-item">FURNITURES</Link>
          <Link 
            to="/dashboard?section=favorites" 
            className="nav-item"
            onClick={handleFavoritesClick}
          >
            FAVORITES
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        {/* Mobile Menu */}
        <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button 
              className="close-mobile-menu"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              ×
            </button>
          </div>
          <div className="mobile-menu-items">
            <Link to="/furnitures" className="mobile-nav-item" onClick={closeMobileMenu}>
              FURNITURES
            </Link>
            <Link 
              to="/dashboard?section=favorites" 
              className="mobile-nav-item" 
              onClick={(e) => {
                handleFavoritesClick(e);
                closeMobileMenu();
              }}
            >
              FAVORITES
            </Link>
            <Link to="/Dashboard" className="mobile-nav-item" onClick={closeMobileMenu}>
              <img src="/img/i-user.png" alt="User Profile" className="icon-main-menu" />
              PROFILE
            </Link>
            <Link to="/ShoppingList" className="mobile-nav-item" onClick={closeMobileMenu}>
              <img src="/img/i-car.png" alt="Shopping Car" className="icon-main-menu" />
              SHOPPING CART
            </Link>
          </div>
          <div className="mobile-menu-auth">
            {user ? (
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }} 
                className={isHome ? "button-1 bt-black margin-b" : "button-1 bt-orange margin-b"}
              >
                Logout
              </button>
            ) : (
              <div onClick={closeMobileMenu}>
                <AuthButtons />
              </div>
            )}
          </div>
        </nav>
        
        {/* Desktop Right Menu */}
        <nav className="right-menu flex desktop-menu">
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
    </>
  );
};

export default Header;
