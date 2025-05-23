import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProfileInfo: React.FC = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postCode: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            country: data.user.country || "",
            postCode: data.user.postCode || "",
            role: data.user.role || "",
          });
        })
        .catch((error) => {
          console.error("Error al obtener el perfil del usuario:", error);
        });
    }
  }, [user, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setMessage("Error al actualizar el perfil.");
    }
  };

  return (
    <div>
   <div>
   
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
      <h2>Información del perfil</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postCode"
          placeholder="Código postal"
          value={formData.postCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Rol"
          value={formData.role}
          onChange={handleChange}
          disabled
        />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default ProfileInfo;




// // src/components/ProfileInfo.tsx
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const ProfileInfo = () => {
//   const { user } = useContext(AuthContext);
//   console.log("User en ProfileInfo:", user); 

//   return (
//     <div>
   
//       {user ? (
//         <div>
//           <p>Nombre: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <p>Teléfono: {user.phone}</p>
//           <p>Dirección: {user.address}, {user.city}, {user.country} ({user.postCode})</p>
//           <p>Rol: {user.role}</p>
//         </div>
//       ) : (
//         <p>No estás logueado</p>
//       )}
//     </div>
//   );
// };

// export default ProfileInfo;