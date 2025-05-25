import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router"; // <- corregido aquí

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
  const { user, token, userReady, loadingUser } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!userReady || !user || !token) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/seller/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos del vendedor:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [userReady, user, token]);

  const handleDelete = async (productId: string) => {
    if (!token) return;

    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((product) => product._id !== productId));
      alert("Producto eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("Hubo un error al eliminar el producto.");
    }
  };

  if (loadingUser || !userReady || loadingProducts) {
    return <p>Cargando tus productos...</p>;
  }

  if (!user) {
    return <p>Debes estar logueado para ver esta sección.</p>;
  }

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
              <Link to={`/products/${product._id}`} className="button-1 bt-orange">
                DETAILS
              </Link>
              <button
                className="button-1 bt-red"
                onClick={() => handleDelete(product._id)}
              >
                ELIMINAR
              </button>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default MyStore;