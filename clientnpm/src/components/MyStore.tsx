import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
}

const MyStore = () => {
  const { user, token, loadingUser } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (loadingUser || !user || !token) return;

    const fetchMyProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/seller/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos del vendedor:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchMyProducts();
  }, [user, token, loadingUser]);

  if (loadingUser || loadingProducts) return <p>Cargando tus productos...</p>;

  if (!user) return <p>Debes estar logueado para ver esta sección.</p>;

  if (user.role !== "seller") {
    return <p>Solo los vendedores pueden ver sus productos aquí.</p>;
  }

  return (
    <div className="grid-3-col">
      {products.length === 0 ? (
        <p>No tienes productos creados aún.</p>
      ) : (
        products.map((product) => (
          <section key={product._id} className="product flex">
            <div className="imgContainer">
              <img src={product.image} alt={product.name} className="product-picture-slider" />
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <h4>{product.price} €</h4>
              <p>{product.category}</p>
              {product.description && <p>{product.description}</p>}
              <Link to={`/products/${product._id}`} className="button-1 bt-orange">
                DETAILS
              </Link>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default MyStore;