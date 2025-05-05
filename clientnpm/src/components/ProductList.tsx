import { useEffect, useState } from "react";
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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
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
      <section className="product flex">
        
          <img src={product.image} alt={product.name} className="product-picture-slider"  />
          <div className="product-content">
          <h3>{product.name}</h3>
          <h4>{product.price} €</h4>
          <p>{product.category}</p>
          {product.description && <p>{product.description}</p>}
          <a href="#" class="button-1 bt-orange">ADD TO CART</a>
          <a href="forniture1.html" class="button-1 bt-orange">DETAILS</a>
          <a href="#" class="button-like bt-black"></a>
          </div>
        
        </section>
      ))}


    
    </div>

  );
};

export default ProductList;