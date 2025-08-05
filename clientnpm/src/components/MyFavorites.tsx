import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { useAlertModal } from '../hooks/useAlertModal';
import AlertModal from './AlertModal';
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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alertState, showInfo, hideAlert } = useAlertModal();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 MyFavorites - User state:', user);
    console.log('🔍 MyFavorites - User exists:', !!user);
    
    if (!user) {
      console.log('❌ MyFavorites - No user found, showing login message');
      showInfo(
        'Login Required',
        'You need to be logged in to view your favorites. Please log in to continue.'
      );
      return;
    }
    
    console.log('✅ MyFavorites - User found, fetching favorites');
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;
    
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

  const handleLoginRedirect = () => {
    hideAlert();
    navigate('/login');
  };

  // If user is not logged in, show login message
  if (!user) {
    return (
      <>
        <AlertModal
          isOpen={alertState.isOpen}
          onClose={handleLoginRedirect}
          type={alertState.type}
          title={alertState.title}
          message={alertState.message}
          showCloseButton={true}
        />
        <div className="login-required-message">
          <h2>My Favorites</h2>
          <p>Please log in to view your favorites.</p>
          <button 
            onClick={handleLoginRedirect}
            className="button-1 bt-orange"
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

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