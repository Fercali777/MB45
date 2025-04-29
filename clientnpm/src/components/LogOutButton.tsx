import { useNavigate } from "react-router";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };




  return (
    <button onClick={handleLogout} className="button-1 bt-orange margin-b">
      Logout
    </button>
  );
};

export default LogoutButton;