import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
}

const AddToCartButton = ({ productId, quantity = 1, className = "button-1 bt-orange" }: AddToCartButtonProps) => {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must log in to add products to your cart");
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
      console.error("Error adding to cart:", err);
      alert("Error adding to cart");
    }
  };

  return (
    <button className={className} onClick={handleAddToCart}>
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;