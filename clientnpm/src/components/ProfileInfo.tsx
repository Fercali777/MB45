// src/components/ProfileInfo.tsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);
  console.log("User en ProfileInfo:", user); 

  return (
    <div>
      <h2>AuthContext Test</h2>
      {user ? (
        <div>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.phone}</p>
          <p>Dirección: {user.address}, {user.city}, {user.country} ({user.postCode})</p>
          <p>Rol: {user.role}</p>
        </div>
      ) : (
        <p>No estás logueado</p>
      )}
    </div>
  );
};

export default ProfileInfo;