import express from 'express';
import { getProductsForUsers, me } from '../controllers/userController';

const router = express.Router();

router.route('/me').get(me);
router.route('/products').get(getProductsForUsers);

export default router;
