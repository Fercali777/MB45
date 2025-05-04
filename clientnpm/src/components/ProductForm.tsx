import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";





const ProductForm = () => {



  const { token } = useContext(AuthContext);
  console.log("Token:", token);  // Verifica si el token es correcto


  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    mainMaterial: "",
    color: "",
    width: "",
    height: "",
    depth: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Producto agregado exitosamente");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al agregar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
      <input name="mainMaterial" placeholder="Main Material" onChange={handleChange} />
      <input name="color" placeholder="Color" onChange={handleChange} />
      <input name="width" type="number" placeholder="Width" onChange={handleChange} />
      <input name="height" type="number" placeholder="Height" onChange={handleChange} />
      <input name="depth" type="number" placeholder="Depth" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Agregar producto</button>
    </form>
  );
};

export default ProductForm;