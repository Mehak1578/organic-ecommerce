import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useState, useEffect } from 'react';
import { ordersAPI } from '../../config/api';
import {
  FaShoppingBag,
  FaHeart,
  FaGift,
  FaMapMarkerAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import './Account.css';

function Account() {
  const { user, logout } = useAuth();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Fetch user orders count
  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const response = await ordersAPI.getUserOrders();
        setOrderCount(response.count || 0);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrderCount(0);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrdersCount();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // User initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null;

  const stats = [
    {
      id: 'orders',
      label: 'Total Orders',
      value: isLoadingOrders ? '...' : orderCount,
      icon: FaShoppingBag
    },
    {
      id: 'wishlist',
      label: 'Wishlist Items',
      value: getWishlistCount(),
      icon: FaHeart
    },
    {
      id: 'rewards',
      label: 'Reward Points',
      value: user?.rewardPoints ?? 0,
      icon: FaGift
    },
    {
      id: 'addresses',
      label: 'Saved Addresses',
      value: user?.addresses?.length ?? 0,
      icon: FaMapMarkerAlt
    }
  ];

  const personalInfo = {
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    pincode: user?.pincode || '',
    street: user?.address || user?.street || '',
    city: user?.city || '',
    state: user?.state || ''
  };

  const getDisplayValue = (value) => {
    if (value === null || value === undefined) return 'Not added';
    const trimmed = String(value).trim();
    return trimmed ? trimmed : 'Not added';
  };

  const isMissing = (value) => {
    if (value === null || value === undefined) return true;
    return String(value).trim() === '';
  };

  return (
    <div className="account-page">
      <div className="account-layout">
        {/* Left column - Profile card */}
        <div className="account-left">
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="profile-avatar">
                <div className="avatar-circle">{getUserInitials(user?.name)}</div>
              </div>
              <div className="profile-main-info">
                <h2 className="profile-name">{user?.name || 'Account'}</h2>
                {user?.email && (
                  <p className="profile-email">{user.email}</p>
                )}
              </div>
            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="profile-btn primary"
                onClick={() => navigate('/orders')}
              >
                My Orders
              </button>
              <button
                type="button"
                className="profile-btn outline"
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="profile-btn text-danger"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="logout-icon" />
                <span>Logout</span>
              </button>
            </div>

            {memberSince && (
              <div className="profile-meta">
                <span className="meta-label">Member since</span>
                <span className="meta-value">{memberSince}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Dashboard content */}
        <div className="account-right">
          {/* Stats section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Account Overview</h2>
            </div>
            <div className="stats-grid">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="stat-card">
                    <div className="stat-icon-wrapper">
                      <Icon className="stat-icon" />
                    </div>
                    <div className="stat-content">
                      <span className="stat-label">{stat.label}</span>
                    </div>
                    <div className="stat-value">{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Personal information section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Personal Information</h2>
              <button
                type="button"
                className="section-action-link"
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </button>
            </div>
            <div className="personal-info-grid">
              <div className="info-field">
                <div className="info-label">Full Name</div>
                <div className={`info-value ${isMissing(personalInfo.fullName) ? 'muted' : ''}`}>
                  {getDisplayValue(personalInfo.fullName)}
                </div>
              </div>
              <div className="info-field">
                <div className="info-label">Email</div>
                <div className={`info-value ${isMissing(personalInfo.email) ? 'muted' : ''}`}>
                  {getDisplayValue(personalInfo.email)}
                </div>
              </div>
              <div className="info-field">
                <div className="info-label">Phone Number</div>
                <div className={`info-value ${isMissing(personalInfo.phone) ? 'muted' : ''}`}>
                  {getDisplayValue(personalInfo.phone)}
                </div>
              </div>
              <div className="info-field">
                <div className="info-label">Pincode</div>
                <div className={`info-value ${isMissing(personalInfo.pincode) ? 'muted' : ''}`}>
                  {getDisplayValue(personalInfo.pincode)}
                </div>
              </div>
              <div className="info-field">
                <div className="info-label">Street Address</div>
                <div className="info-value">
                  {personalInfo.street && personalInfo.street.trim() ? (
                    personalInfo.street
                  ) : (
                    <button
                      type="button"
                      className="info-add-link"
                      onClick={() => navigate('/profile/edit')}
                    >
                      Add details
                    </button>
                  )}
                </div>
              </div>
              <div className="info-field">
                <div className="info-label">City</div>
                <div className={`info-value ${isMissing(personalInfo.city) ? 'muted' : ''}`}>
                  {getDisplayValue(personalInfo.city)}
                </div>
              </div>
              <div className="info-field">
                <div className="info-label">State</div>
                <div className={`info-value ${isMissing(personalInfo.state) ? 'muted' : ''}`}>
                  {getDisplayValue(personalInfo.state)}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Account;
