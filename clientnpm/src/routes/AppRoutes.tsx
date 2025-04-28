import { Outlet, useLocation } from "react-router"; 
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppRoutes = () => {
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("backHome");
      document.body.classList.remove("backPositiv");
    } else {
      document.body.classList.add("backPositiv");
      document.body.classList.remove("backHome");
    }
  
    return () => {
      document.body.classList.remove("backHome");
      document.body.classList.remove("backPositiv");
    };
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppRoutes;