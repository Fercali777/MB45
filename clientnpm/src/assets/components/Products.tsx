import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu backend
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data)) // Guarda los productos en el estado
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;