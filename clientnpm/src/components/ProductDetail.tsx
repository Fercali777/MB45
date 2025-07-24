import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import AddToCartButton from "./AddToCartButton";
import "./product-list.css";
const API_URL = import.meta.env.VITE_API_URL;
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  mainMaterial?: string;
  color?: string;
  width?: number;
  height?: number;
  depth?: number;
  description?: string;
  image: string;
  seller?: {
    name: string;
    email: string;
  };
}

const ProductDetail = () => {
  const { id: productId } = useParams(); // Renombramos a productId
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const handleCommentAdded = () => setReload(!reload);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/products/${productId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error al obtener producto:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <img
            src={product.image}
            alt={product.name}
            className="product-picture-list"
          />
          
        </div>

        <div className="col-lg-6 col-sm-12">
          <div className="detail-content">
            <h2>{product.name}</h2>
            <h3>{product.price} €</h3>
            <p>{product.description}</p>
            <p>
              <strong>Categoría:</strong> {product.category}
            </p>
            <p>
              <strong>Material:</strong> {product.mainMaterial}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Dimensiones:</strong> {product.width}x{product.height}x
              {product.depth} cm
            </p>
            <p>
              <strong>Stock disponible:</strong> {product.stock}
            </p>
            {product.seller && (
              <p>
                <strong>Vendedor:</strong> {product.seller.name} (
                {product.seller.email})
              </p>
            )}
            {product._id && <AddToCartButton productId={product._id} />}
          </div>
        </div>
      </div>

      {/* Comentarios */}
      {productId && (
        <>
          <CommentForm
            productId={product._id}
            onCommentAdded={handleCommentAdded}
          />
          <CommentList key={reload.toString()} productId={product._id} />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
