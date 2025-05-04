import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProductForm = () => {
  const { token } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Para la vista previa de la imagen
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(previewUrl); // Set preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (parseFloat(formData.price) <= 0) {
      alert("El precio debe ser un valor positivo");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/products/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Producto agregado exitosamente");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Error al agregar producto");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          required
        />
        <input
          name="mainMaterial"
          placeholder="Main Material"
          onChange={handleChange}
        />
        <input name="color" placeholder="Color" onChange={handleChange} />
        <input
          name="width"
          type="number"
          placeholder="Width"
          onChange={handleChange}
        />
        <input
          name="height"
          type="number"
          placeholder="Height"
          onChange={handleChange}
        />
        <input
          name="depth"
          type="number"
          placeholder="Depth"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {imagePreview && (
          <div>
            <h4>Vista previa:</h4>
            <img src={imagePreview} alt="Vista previa" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        )}

        <button type="submit">Agregar producto</button>
      </form>
    </div>
  );
};

export default ProductForm;
// import { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";




// const ProductForm = () => {



//   const { token } = useContext(AuthContext);
//   console.log("Token:", token);  // Verifica si el token es correcto


//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     price: "",
//     stock: "",
//     mainMaterial: "",
//     color: "",
//     width: "",
//     height: "",
//     depth: "",
//     description: "",
//   });

  


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/products/add", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Producto agregado exitosamente");
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Error al agregar producto");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" onChange={handleChange} required />
//       <input name="category" placeholder="Category" onChange={handleChange} required />
//       <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
//       <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
//       <input name="mainMaterial" placeholder="Main Material" onChange={handleChange} />
//       <input name="color" placeholder="Color" onChange={handleChange} />
//       <input name="width" type="number" placeholder="Width" onChange={handleChange} />
//       <input name="height" type="number" placeholder="Height" onChange={handleChange} />
//       <input name="depth" type="number" placeholder="Depth" onChange={handleChange} />
//       <textarea name="description" placeholder="Description" onChange={handleChange} />
//       <button type="submit">Agregar producto</button>
//     </form>
//   );
// };

// export default ProductForm;