import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  uploadProductImage,
} from '../controllers/productController';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct).get(getProduct);
router.route('/upload').post(uploadProductImage);

export default router;
