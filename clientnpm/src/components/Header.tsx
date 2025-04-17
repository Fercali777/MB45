// import { Link, useLocation } from "react-router";
// import { AuthContext } from "../context/AuthContext";
// import { useContext, useState, useEffect } from "react";




//   const { user, logout } = useContext(AuthContext);
//   const location = useLocation();

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const hideButtons =
//     (location.pathname === "/login" || location.pathname === "/register") &&
//     isMobile;
//   return (
//     <header className="flex">
//       <div className="logo">
//         <Link to="/">
//           <img src="/img/Logo.png" alt="Logo" />
//         </Link>
//       </div>
//       <nav className="mainMenu">
//         <Link to="/vinyl-hunt">Vinyl Hunt</Link>
//         <Link to="/my-spins">My Spins</Link>
//       </nav>
//       <p className="userName">
//         {user?.displayName && `Welcome ${user.displayName}!`}
//       </p>
//       {!hideButtons && (
//         <div>
//           {!user && (
//             <Link to="/register">
//               <button className="littleButton buttonYellow">Register</button>
//             </Link>
//           )}
//           {user ? (
//             <button className="littleButton buttonYellow" onClick={logout}>
//               Log Out
//             </button>
//           ) : (
//             <Link to="/login">
//               <button className="littleButton">Login</button>
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );






const Header = () => {
  return (
<header className ="flex">
        <div className="logo">
          <a href="index.html" className="logo" >
            <img src="img/logoMB45-n.png" alt="logo MB45"></img>
          </a>
        </div>
        <nav className="main-menu flex">
          <a href="fornitures.html" className="nav-item ">FURNITURES</a>
          <a href="contact.html" className="nav-item">CONTACT</a>
          <a href="shopping-car.html" className="nav-item">SHOPPING LIST</a>
        </nav>
        <nav className="right-menu flex">
          <a href="#" title="User Profile"><img src="img/i-user.png" alt="User Profile" className="icon-main-menu" /></a>
          <a href="shopping-car.html" title="Shopping Car"><img src="img/i-car.png" alt="Shopping Car" className="icon-main-menu"/></a>
          <a href="contact.html" title="Contact"><img src="img/i-contact.png" alt="Contact" className="icon-main-menu"/></a>
        </nav>
      </header>
  );
};

export default Header;
