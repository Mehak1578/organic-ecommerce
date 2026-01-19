import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Account.css';

function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile and preferences</p>
        </div>

        <div className="account-content">
          <div className="account-section">
            <h2>Profile Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user?.name || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user?.email || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Account Type</label>
                <p>{user?.provider === 'google' ? 'Google Account' : 'Local Account'}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="account-actions">
            <button className="btn-secondary" onClick={() => navigate('/wishlist')}>
              View Wishlist
            </button>
            <button className="btn-secondary" onClick={() => navigate('/cart')}>
              View Cart
            </button>
            <button className="btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
