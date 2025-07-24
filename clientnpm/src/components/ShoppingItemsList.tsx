import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./product-list.css";
import "./buttons.css";
const API_URL = import.meta.env.VITE_API_URL;
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  mainMaterial?: string;
  color?: string;
  width?: number;
  height?: number;
  depth?: number;
  stock?: number;
  seller?: {
    name: string;
    email: string;
  };
}

interface ShoppingItem {
  _id: string;
  productId: Product;
  quantity: number;
}

export const ShoppingItemsList = () => {
  const { user, token, loadingUser } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loadingUser) return <p>Loading user...</p>;
  if (!user) return <p>You must log in to view your shopping list.</p>;
  if (user.role !== "buyer")
    return <p>Only users with the buyer role can access the list.</p>;

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/shopping`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error loading shopping list");

        const data: ShoppingItem[] = await res.json();
        
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Error: Invalid data received");
          setItems([]);
        }
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [token]);

  const handleRemove = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/shopping/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error deleting product");

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Error deleting product");
    }
  };

  if (loading) return <p>Loading shopping list...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(items)) return <p>Error: Invalid data format</p>;

  return (
    <div>
      <h1>My Shopping List</h1>
      {items.length === 0 && <p>Your list is empty.</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map(({ _id, productId, quantity }) => (
          <li
            key={_id}
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2rem",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              alignItems: "flex-start",
            }}
          >
            <img
              src={productId.image}
              alt={productId.name}
              width={120}
              style={{ objectFit: "contain", borderRadius: 8 }}
            />
            <div>
              <h3>{productId.name}</h3>
              <p><strong>Price:</strong> €{productId.price.toFixed(2)}</p>
              {productId.description && <p>{productId.description}</p>}
              {productId.category && <p><strong>Category:</strong> {productId.category}</p>}
              {productId.mainMaterial && <p><strong>Material:</strong> {productId.mainMaterial}</p>}
              {productId.color && <p><strong>Color:</strong> {productId.color}</p>}
              {(productId.width && productId.height && productId.depth) && (
                <p>
                  <strong>Dimensions:</strong> {productId.width} x {productId.height} x {productId.depth} cm
                </p>
              )}
              {productId.stock !== undefined && (
                <p><strong>Stock available:</strong> {productId.stock}</p>
              )}
              {productId.seller?.name && productId.seller?.email && (
  <p><strong>Seller:</strong> {productId.seller.name} ({productId.seller.email})</p>
)}
              <p><strong>Amount:</strong> {quantity}</p>
              <p><strong>Subtotal:</strong> €{(productId.price * quantity).toFixed(2)}</p>
              <button className="button-1 bt-orange"
                style={{ marginTop: "0.5rem" }}
                onClick={() => handleRemove(_id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
