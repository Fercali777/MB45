import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';

interface FavoriteButtonProps {
  productId: string;
  className?: string;
  onToggle?: (productId: string, isFavorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, className = "button-like bt-black", onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Check if product is in favorites on component mount
  useEffect(() => {
    if (user) {
      checkFavoriteStatus();
    }
  }, [productId, user]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await axiosInstance.get(`/favorites/check/${productId}`);
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      alert('Please log in to add favorites');
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await axiosInstance.delete(`/favorites/remove/${productId}`);
        setIsFavorite(false);
        onToggle?.(productId, false);
      } else {
        // Add to favorites
        await axiosInstance.post(`/favorites/add/${productId}`);
        setIsFavorite(true);
        onToggle?.(productId, true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Error updating favorites');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // Don't show button if user is not logged in
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`${className} ${isFavorite ? 'active' : ''}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      ♥
    </button>
  );
};

export default FavoriteButton; 