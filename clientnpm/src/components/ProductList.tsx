import { useEffect, useState } from "react";
import axios from "axios";
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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("⏳ Haciendo la solicitud a /api/products...");
        const res = await axios.get("http://localhost:5000/api/products");
        console.log("📦 Productos recibidos:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/shopping/add",
        { productId, quantity: 1 },
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

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="grid-3-col">
      {products.map((product) => (
        <section key={product._id} className="product flex">
          <div className="imgContainer">
            <img
              src={product.image}
              alt={product.name}
              className="product-picture-slider"
            />
          </div>
          <div className="product-content">
            <h3>{product.name}</h3>
            <h4>{product.price} €</h4>
            <p>{product.category}</p>
            {product.description && <p>{product.description}</p>}
            <button
              className="button-1 bt-orange"
              onClick={() => handleAddToCart(product._id)}
            >
              ADD TO CART
            </button>
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
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router";


// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   description?: string;
//   stock: number;
// }

// const ProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {


//     const fetchProducts = async () => {
//       try {
//         console.log("⏳ Haciendo la solicitud a /api/products...");
//         const res = await axios.get("http://localhost:5000/api/products");
//         console.log("📦 Productos recibidos:", res.data);
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error al obtener productos:", err);
//       } finally {
//         setLoading(false);
//       }
//     };


//     fetchProducts();
//   }, []);

//   if (loading) return <p>Cargando productos...</p>;

//   return (
//     <div className="grid-3-col">
    
//     {products.map((product) => (
//   <section key={product._id} className="product flex">
//     <div className="imgContainer">
//       <img src={product.image} alt={product.name} className="product-picture-slider" />
//     </div>
//     <div className="product-content">
//       <h3>{product.name}</h3>
//       <h4>{product.price} €</h4>
//       <p>{product.category}</p>
//       {product.description && <p>{product.description}</p>}
//       <a href="#" className="button-1 bt-orange">ADD TO CART</a>
//       <Link to={`/products/${product._id}`} className="button-1 bt-orange">DETAILS</Link>
//       <a href="#" className="button-like bt-black"></a>
//     </div>
//   </section>
// ))}


    
//     </div>

//   );
// };

// export default ProductList;