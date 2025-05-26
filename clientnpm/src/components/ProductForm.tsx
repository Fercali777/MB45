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
      alert("The price must be a positive value");
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
      alert("Product added successfully");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
  <div className="grid-2-col-form">
    <input
      name="name"
      placeholder="Name"
      onChange={handleChange}
      required
    />

    <select name="category" onChange={handleChange} required>
      <option value="">Select category</option>
      <option value="chair">Chair</option>
      <option value="table">Table</option>
      <option value="sofa">Sofa</option>
      <option value="shelf">Shelf</option>
      <option value="bed">Bed</option>
      <option value="stool">Stool</option>
      <option value="desk">Desk</option>
      <option value="bench">Bench</option>
      <option value="cabinet">Cabinet</option>
      <option value="dresser">Dresser</option>
    </select>

    

      <input
        name="price"
        type="number"
        placeholder="Price (€)"
        step="0.01"
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

    <input
      name="color"
      placeholder="Color"
      onChange={handleChange}
    />

    <div className="flex gap1 e3in1">
      <input
        name="width"
        type="number"
        placeholder="Width (cm)"
        onChange={handleChange}
      />
      <input
        name="height"
        type="number"
        placeholder="Height (cm)"
        onChange={handleChange}
      />
      <input
        name="depth"
        type="number"
        placeholder="Depth (cm)"
        onChange={handleChange}
      />
    </div>

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      required
    />

    {imagePreview && (
      <div>
        <h4>Preview:</h4>
        <img
          src={imagePreview}
          alt="Preview"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    )}

    <textarea
      name="description"
      placeholder="Description"
      onChange={handleChange}
    />
  </div>

  <button className="button-1 bt-orange" type="submit">
    Add product
  </button>
</form>
  );
};

export default ProductForm;
