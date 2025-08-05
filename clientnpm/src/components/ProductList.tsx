import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import "./product-list.css";
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔍 Making the request to /api/products...");
        console.log("📡 API_URL:", import.meta.env.VITE_API_URL);
        console.log("🌐 Full URL:", `${import.meta.env.VITE_API_URL || '/api'}/products`);
        const res = await axiosInstance.get(`/products`);
        console.log("✅ Products received:", res.data);
        console.log("📊 Type of res.data:", typeof res.data);
        console.log("📋 Is Array?", Array.isArray(res.data));
        
        // Verificar que res.data sea un array
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("API returned non-array data:", res.data);
          setError("Error: Invalid data received");
          setProducts([]);
        }
      } catch (err) {
        console.error("Error getting products:", err);
        setError("Error loading products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log("Current products state:", products);
  console.log("Is products array?", Array.isArray(products));

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(products)) return <p>Error: Invalid data format</p>;

  return (
    <div className="grid-3-col">
      {products.map((product) => (
        <section key={product._id} className="product flex">
          <div className="imgContainer">
            <img
              src={product.image}
              alt={product.name}
              className="product-picture-list"
            />
          </div>
          <div className="product-content">
            <h3>{product.name}</h3>
            <h4>{product.price} €</h4>
            <p>{product.category}</p>
            {product.description && <p>{product.description}</p>}
            <div className="product-buttons flex gap1">
              {product._id && <AddToCartButton productId={product._id} />}
              <Link
                to={`/products/${product._id}`}
                className="button-1 bt-orange"
              >
                DETAILS
              </Link>
              <FavoriteButton productId={product._id} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
