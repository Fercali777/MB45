import axios from "axios";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
}
const API_URL = import.meta.env.VITE_API_URL;
const AddToCartButton = ({ productId, quantity = 1, className = "button-1 bt-orange" }: AddToCartButtonProps) => {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return;
      }

      const res = await axios.post(
        `${API_URL}/shopping/add`,
       
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Producto añadido al carrito!");
      console.log("✅ Respuesta:", res.data);
    } catch (err) {
      console.error("❌ Error al agregar al carrito:", err);
      alert("Error al agregar al carrito");
    }
  };

  return (
    <button className={className} onClick={handleAddToCart}>
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;