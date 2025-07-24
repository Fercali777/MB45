import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../services/axiosInstance';
import AddToCartButton from './AddToCartButton';
import FavoriteButton from './FavoriteButton';
import './product-list.css';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
}

const MyFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get('/favorites/my-favorites');
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Error loading favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(product => product._id !== productId));
  };

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any products to your favorites yet.</p>
      ) : (
        <div className="grid-2-col">
          {favorites.map((product) => (
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
                  <FavoriteButton 
                    productId={product._id} 
                    className="button-like bt-black active"
                    onToggle={handleRemoveFavorite}
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites; 