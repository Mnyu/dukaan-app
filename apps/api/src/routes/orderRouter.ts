import express from 'express';
import {
  createOrder,
  getOrder,
  getOrders,
} from '../controllers/orderController';

const router = express.Router();

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrder);

export default router;
