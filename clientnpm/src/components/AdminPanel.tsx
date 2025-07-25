import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAlertModal } from '../hooks/useAlertModal';
import AlertModal from './AlertModal';
import axiosInstance from '../services/axiosInstance';
import './admin-panel.css';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  isDeleted?: boolean;
  deletedAt?: string;
  seller?: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface AdminStats {
  users: {
    total: number;
    admins: number;
    sellers: number;
    buyers: number;
  };
  products: {
    total: number;
    active: number;
    deleted: number;
  };
}

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const { alertState, showSuccess, showError, hideAlert } = useAlertModal();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'all' | 'active' | 'deleted'>('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchProducts();
      fetchStats();
    }
  }, [user, viewMode]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let endpoint = '/admin/products';
      
      if (viewMode === 'active') {
        endpoint = '/admin/products/active';
      } else if (viewMode === 'deleted') {
        endpoint = '/admin/products/deleted';
      }
      
      const response = await axiosInstance.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showError('Error', 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/products/${productId}`);
      showSuccess('Success', `Product "${productName}" deleted successfully`);
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error('Error deleting product:', error);
      showError('Error', 'Failed to delete product');
    }
  };

  const handleRestoreProduct = async (productId: string, productName: string) => {
    try {
      await axiosInstance.patch(`/admin/products/${productId}/restore`);
      showSuccess('Success', `Product "${productName}" restored successfully`);
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error('Error restoring product:', error);
      showError('Error', 'Failed to restore product');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm('Are you sure you want to delete all test products?')) {
      return;
    }

    try {
      const response = await axiosInstance.delete('/admin/products/cleanup/bulk');
      showSuccess('Success', response.data.message);
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error('Error bulk deleting products:', error);
      showError('Error', 'Failed to bulk delete products');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="admin-panel">
        <div className="admin-access-denied">
          <h2>🔒 Access Denied</h2>
          <p>You need admin privileges to access this panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛠️ Admin Panel</h1>
        <p>Welcome, {user.name}! Manage all products and users.</p>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="admin-stats">
          <div className="stats-card">
            <h3>👥 Users</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.users.total}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.users.admins}</span>
                <span className="stat-label">Admins</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.users.sellers}</span>
                <span className="stat-label">Sellers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.users.buyers}</span>
                <span className="stat-label">Buyers</span>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <h3>📦 Products</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.products.total}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.products.active}</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.products.deleted}</span>
                <span className="stat-label">Deleted</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="admin-controls">
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            All Products
          </button>
          <button 
            className={`view-btn ${viewMode === 'active' ? 'active' : ''}`}
            onClick={() => setViewMode('active')}
          >
            Active Only
          </button>
          <button 
            className={`view-btn ${viewMode === 'deleted' ? 'active' : ''}`}
            onClick={() => setViewMode('deleted')}
          >
            Deleted Only
          </button>
        </div>
        
        <button className="bulk-delete-btn" onClick={handleBulkDelete}>
          🗑️ Delete Test Products
        </button>
      </div>

      {/* Products List */}
      <div className="products-section">
        <h2>Products ({products.length})</h2>
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">No products found.</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className={`product-card ${product.isDeleted ? 'deleted' : ''}`}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isDeleted && <div className="deleted-badge">DELETED</div>}
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                  <p className="product-seller">Seller: {product.seller?.name || 'Unknown'}</p>
                  <p className="product-date">
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                  
                  {product.isDeleted && (
                    <p className="deleted-date">
                      Deleted: {new Date(product.deletedAt!).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="product-actions">
                  {product.isDeleted ? (
                    <button 
                      className="restore-btn"
                      onClick={() => handleRestoreProduct(product._id, product.name)}
                    >
                      🔄 Restore
                    </button>
                  ) : (
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product._id, product.name)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertModal 
        isOpen={alertState.isOpen} 
        onClose={hideAlert} 
        type={alertState.type} 
        title={alertState.title} 
        message={alertState.message} 
      />
    </div>
  );
};

export default AdminPanel; 