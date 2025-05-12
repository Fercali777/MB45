import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
}

const ProductDetail = () => {
  const { id } = useParams();  // Obtener el ID desde la URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Buscando producto con ID:", id);  // Este es el log que ayudaría a ver si el ID es correcto
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log("Producto recibido:", res.data);  // Este log mostrará los datos del producto
        setProduct(res.data);  // Guardamos el producto en el estado
      } catch (err) {
        console.error("Error al obtener producto:", err);
      } finally {
        setLoading(false);  // Cuando termine la solicitud, indicamos que ya no estamos cargando
      }
    };

    if (id) {
      fetchProduct();  // Solo ejecutamos si hay un ID válido
    }
  }, [id]);  // El useEffect se ejecutará cuando cambie el ID en la URL

  if (loading) return <p>Cargando producto...</p>;

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <h3>{product.price} €</h3>
      <p>{product.category}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;

// import { useParams } from "react-router";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   mainMaterial?: string;
//   color?: string;
//   width?: number;
//   height?: number;
//   depth?: number;
//   description?: string;
//   image: string;
//   seller?: {
//     name: string;
//     email: string;
//   };
// }

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     console.log("ID del producto:", id);
//     // ...
//   }, [id]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error al obtener producto:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <p>Cargando detalle del producto...</p>;
//   if (!product) return <p>Producto no encontrado</p>;

//   return (
//     <div className="product-detail">
//       <img src={product.image} alt={product.name} className="detail-image" />
//       <div className="detail-content">
//         <h2>{product.name}</h2>
//         <p><strong>Precio:</strong> {product.price} €</p>
//         <p><strong>Categoría:</strong> {product.category}</p>
//         <p><strong>Material:</strong> {product.mainMaterial}</p>
//         <p><strong>Color:</strong> {product.color}</p>
//         <p><strong>Dimensiones:</strong> {product.width}x{product.height}x{product.depth} cm</p>
//         <p><strong>Stock disponible:</strong> {product.stock}</p>
//         <p><strong>Descripción:</strong> {product.description}</p>
//         {product.seller && (
//           <p><strong>Vendedor:</strong> {product.seller.name} ({product.seller.email})</p>
//         )}
//       </div>
//     </div>
//   );
// }; 

// export default ProductDetail;