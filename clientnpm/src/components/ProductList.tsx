import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import AddToCartButton from "./AddToCartButton";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Making the request to /api/products...");
        const res = await axios.get("https://mb-45-mongo-db.vercel.app/api/products");
        console.log("Products received:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error getting products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

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
            {product._id && <AddToCartButton productId={product._id} />}
            <Link
              to={`/products/${product._id}`}
              className="button-1 bt-orange"
            >
              DETAILS
            </Link>
            <a href="#" className="button-like bt-black"></a>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
