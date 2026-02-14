import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/orders');

        // Support both { orders: [] } and { data: [] } response shapes
        const data = response.data?.orders || response.data?.data || [];
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setError(
          err.response?.data?.message ||
          'Unable to load your orders right now. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getNormalizedStatus = (order) => {
    const raw = (order.orderStatus || order.status || 'pending').toString().toLowerCase();
    if (['pending', 'shipped', 'delivered', 'cancelled'].includes(raw)) return raw;
    return 'pending';
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-error-card">
          <h1>My Orders</h1>
          <p className="orders-error-message">{error}</p>
          <button
            type="button"
            className="orders-btn-primary"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track, return, or buy items again.</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>You have no orders yet</h2>
          <p>Start shopping and your orders will appear here.</p>
          <button
            type="button"
            className="orders-btn-primary"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const status = getNormalizedStatus(order);
            const label = getStatusLabel(status);

            return (
              <div key={order._id || order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="order-label">Order ID</span>
                    <span className="order-value">
                      {order.orderId || order._id || 'N/A'}
                    </span>
                  </div>
                  <div className={`order-status status-${status}`}>
                    {label}
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-info-row">
                    <span className="order-label">Placed on</span>
                    <span className="order-value">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Not available'}
                    </span>
                  </div>
                  <div className="order-info-row">
                    <span className="order-label">Total Amount</span>
                    <span className="order-value">
                      ₹{(order.total || order.amount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="order-info-row">
                    <span className="order-label">Items</span>
                    <span className="order-value">
                      {order.items?.length ?? 0}
                    </span>
                  </div>
                  <div className="order-info-row">
                    <span className="order-label">Payment</span>
                    <span className="order-value">
                      {(order.paymentMethod || 'cod').toString().toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="order-card-footer">
                  <button
                    type="button"
                    className="orders-btn-outline"
                    onClick={() => navigate(`/orders/${order._id || order.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
