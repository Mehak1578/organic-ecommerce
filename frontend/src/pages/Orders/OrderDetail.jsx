import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../config/api';
import { FaDownload } from 'react-icons/fa';
import './Orders.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get(`/orders/${id}`);
        const data = response.data?.order || response.data?.data || null;
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order details:', err);
        setError(
          err.response?.data?.message ||
          'Unable to load this order right now. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="orders-page">
        <div className="orders-error-card">
          <h1>Order Details</h1>
          <p className="orders-error-message">{error || 'Order not found.'}</p>
          <button
            type="button"
            className="orders-btn-primary"
            onClick={() => navigate('/orders')}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const placedOn = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Not available';

  const delivery = order.deliveryAddress || {};

  const normalizedStatus = (order.orderStatus || order.status || 'pending').toString().toLowerCase();
  const steps = ['pending', 'shipped', 'delivered'];

  const handleDownloadInvoice = () => {
    if (!invoiceRef.current) return;

    const printContents = invoiceRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=800,width=900');

    if (!printWindow) return;

    printWindow.document.write('<html><head><title>Invoice - OrganicShop</title>');
    printWindow.document.write(`
      <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 24px; background: #f9fafb; }
        .invoice-card { max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 20px 24px; box-shadow: 0 6px 18px rgba(15,23,42,0.08); }
        .invoice-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .invoice-brand { font-size: 20px; font-weight: 600; color: #111827; }
        .invoice-meta { font-size: 12px; color: #6b7280; }
        .invoice-meta div { margin: 1px 0; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
        .invoice-table th, .invoice-table td { padding: 6px 4px; text-align: left; }
        .invoice-table thead th { border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #4b5563; }
        .invoice-table tbody tr + tr td { border-top: 1px solid #f3f4f6; }
        .invoice-summary { margin-top: 12px; display: flex; flex-direction: column; align-items: flex-end; gap: 4px; font-size: 13px; }
        .invoice-summary-row { display: flex; gap: 20px; }
        .invoice-summary-label { color: #6b7280; }
        .invoice-summary-value { font-weight: 600; color: #111827; }
      </style>
    `);
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="orders-page">
      <div className="orders-header order-detail-header">
        <button
          type="button"
          className="orders-back-link"
          onClick={() => navigate('/orders')}
        >
          Back to My Orders
        </button>
        <h1>Order Details</h1>
        <p>Order ID: {order.orderId || order._id}</p>
      </div>

      <div className="order-detail-layout">
        <div className="order-detail-main">
          <div className="order-card">
            <div className="order-card-header">
              <div>
                <span className="order-label">Order Status</span>
                <span className="order-value">{order.status || order.orderStatus}</span>
              </div>
              <div>
                <span className="order-label">Placed on</span>
                <span className="order-value">{placedOn}</span>
              </div>
            </div>

            <div className="order-card-body order-detail-body">
              <div className="order-info-row">
                <span className="order-label">Payment Method</span>
                <span className="order-value">{order.paymentMethod || 'Not specified'}</span>
              </div>
              <div className="order-info-row">
                <span className="order-label">Total Amount</span>
                <span className="order-value">
                  ₹{(order.total || order.amount || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="order-timeline">
              {steps.map((step) => {
                const isCompleted =
                  normalizedStatus === 'delivered' ||
                  (normalizedStatus === 'shipped' && (step === 'pending' || step === 'shipped')) ||
                  (normalizedStatus === 'pending' && step === 'pending');
                const isActive = normalizedStatus === step;

                return (
                  <div
                    key={step}
                    className={`order-timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  >
                    <span className="order-timeline-dot" />
                    <span>{step.charAt(0).toUpperCase() + step.slice(1)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-card">
            <h2 className="order-section-title">Items in this order</h2>
            <div className="order-items-list">
              {order.items?.map((item) => (
                <div key={item.productId || item._id} className="order-item-row">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />
                  )}
                  <div className="order-item-info">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-meta">
                      <span>Qty: {item.quantity}</span>
                      <span>Price: ₹{Number(item.price).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="order-item-total">
                    ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="invoice-card" ref={invoiceRef}>
            <div className="invoice-header">
              <div className="invoice-brand">OrganicShop</div>
              <div className="invoice-meta">
                <div>Invoice for Order #{order.orderId || order._id}</div>
                <div>Date: {placedOn}</div>
                <div>Payment: {order.paymentMethod || 'Not specified'}</div>
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item) => (
                  <tr key={item.productId || item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{Number(item.price).toFixed(2)}</td>
                    <td>₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-summary">
              <div className="invoice-summary-row">
                <span className="invoice-summary-label">Subtotal</span>
                <span className="invoice-summary-value">
                  ₹{(order.subtotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="invoice-summary-row">
                <span className="invoice-summary-label">Delivery Fee</span>
                <span className="invoice-summary-value">
                  ₹{(order.deliveryCharge || 0).toFixed(2)}
                </span>
              </div>
              <div className="invoice-summary-row">
                <span className="invoice-summary-label">Total</span>
                <span className="invoice-summary-value">
                  ₹{(order.total || order.amount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="invoice-download-wrapper">
            <button
              type="button"
              className="invoice-download-btn"
              onClick={handleDownloadInvoice}
            >
              <span className="invoice-download-icon">
                <FaDownload />
              </span>
              <span>Download Invoice</span>
            </button>
          </div>
        </div>

        <aside className="order-detail-sidebar">
          <div className="order-card">
            <h2 className="order-section-title">Delivery Address</h2>
            <div className="order-address-text">
              <div>{delivery.name}</div>
              <div>{delivery.address}</div>
              <div>
                {delivery.city} {delivery.pincode}
              </div>
              <div>{delivery.phone}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;
