import axios from "axios";
import { useAlertModal } from "../hooks/useAlertModal";
import AlertModal from "./AlertModal";
import "./buttons.css";

const API_URL = import.meta.env.VITE_API_URL;

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
}

const AddToCartButton = ({ productId, quantity = 1, className = "button-1 bt-orange" }: AddToCartButtonProps) => {
  const { alertState, showError, showSuccess, hideAlert } = useAlertModal();

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showError(
          "Session required", 
          "You must log in to add products to your cart."
        );
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

      showSuccess(
        "Success!", 
        "Product added to cart successfully."
      );
      console.log("Answer:", res.data);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      showError(
        "Error", 
        "Error adding product to cart. Please try again."
      );
    }
  };

  return (
    <>
      <button className={className} onClick={handleAddToCart}>
        ADD TO CART
      </button>
      
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />
    </>
  );
};

export default AddToCartButton;