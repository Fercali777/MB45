import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postCode: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        formData
      );
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Registration error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-2-col-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Pasword"
          onChange={handleChange}
          required
        />
        <input
          type="phone"
          name="phone"
          placeholder="Phonee"
          onChange={handleChange}
          required
        />
        <input
          type="address"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          type="city"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />
        <input
          type="country"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />
        <input
          type="postCode"
          name="postCode"
          placeholder="PostCode"
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex align-items-center gap1 align-items-baseline ">
        <p>Seller</p>
        <input
          type="radio"
          id="seller"
          name="role"
          value="seller"
          onChange={handleChange}
          required checked={formData.role === "seller"} 
        ></input>
        <p>Buyer</p>
        <input
          type="radio"
          id="buyer"
          name="role"
          value="buyer"
          onChange={handleChange}
          checked={formData.role === "buyer"}
        ></input>
      </div>
      <div className="flex "></div>

      <button className="button-1 bt-orange margin-b" type="submit">
        Register
      </button>
      {message && <p>{message}</p>}
    </form>

  );
};

export default RegisterForm;
