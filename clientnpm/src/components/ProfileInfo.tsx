import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./forms.css";
import "./buttons.css";
const API_URL = import.meta.env.VITE_API_URL;

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
        .get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Datos del usuario:", response.data);
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
          console.error("Error getting user profile:", error);
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
      await axios.put(
        `${API_URL}/auth/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile:");
    }
  };

  return (
    <div>
      <div>
        {token ? (
          <div>
            <h2>My profile information</h2>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone Number: {formData.phone}</p>
            <p>
              Address:
              {[formData.address, formData.city, formData.country].filter(Boolean).join(", ")}
              {formData.postCode && ` (${formData.postCode})`}
            </p>
            <p>Role: {formData.role}</p>
          </div>
        ) : (
          <p>You are not logged in</p>
        )}
      </div>





      <h2>Change information</h2>
      {message && <p>{message}</p>}
      <form className="wrap flex gap1" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postCode"
          placeholder="Post Code"
          value={formData.postCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          disabled
        />
        <button className="button-1 bt-orange" type="submit">
          Save changes{" "}
        </button>
      </form>

      <h2>Change my profile information</h2>

      <div class="grid-2-col-form">

        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="postCode"
          placeholder="Post Code"
          value={formData.postCode}
          onChange={handleChange}
        />
        </div>
        <div>
          <button className="button-edit bt-black" type="submit">Edit</button>
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          disabled
        />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
