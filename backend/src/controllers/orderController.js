import Order from '../models/Order.js';
import mongoose from 'mongoose';

// Helper function to check MongoDB connection
const checkDBConnection = () => {
  if (mongoose.connection.readyState !== 1) {
    return {
      connected: false,
      error: 'Database connection unavailable. Please contact support.'
    };
  }
  return { connected: true };
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    // Check database connection
    const dbCheck = checkDBConnection();
    if (!dbCheck.connected) {
      return res.status(503).json({
        success: false,
        message: dbCheck.error
      });
    }

    const {
      items,
      deliveryAddress,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total
    } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Delivery address is required'
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items,
      deliveryAddress,
      paymentMethod: paymentMethod || 'cod',
      subtotal,
      deliveryCharge,
      total,
      orderStatus: 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        _id: order._id,
        orderId: order.orderId,
        items: order.items,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        total: order.total,
        orderDate: order.orderDate
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order. Please try again.',
      error: error.message
    });
  }
};

// @desc    Get all orders for logged-in user
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    // Check database connection
    const dbCheck = checkDBConnection();
    if (!dbCheck.connected) {
      return res.status(503).json({
        success: false,
        message: dbCheck.error
      });
    }

    const orders = await Order.find({ user: req.user.id })
      .sort({ orderDate: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    // Check database connection
    const dbCheck = checkDBConnection();
    if (!dbCheck.connected) {
      return res.status(503).json({
        success: false,
        message: dbCheck.error
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure order belongs to logged-in user
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    // Check database connection
    const dbCheck = checkDBConnection();
    if (!dbCheck.connected) {
      return res.status(503).json({
        success: false,
        message: dbCheck.error
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure order belongs to logged-in user
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.orderStatus}`
      });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
};
