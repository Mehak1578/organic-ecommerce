import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} from '../controllers/orderController.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

// Create order and get user's orders
router.route('/')
  .post(createOrder)
  .get(getUserOrders);

// Get specific order
router.get('/:id', getOrderById);

// Cancel order
router.put('/:id/cancel', cancelOrder);

export default router;
