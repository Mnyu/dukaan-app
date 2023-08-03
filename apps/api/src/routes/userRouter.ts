import express from 'express';
import { me } from '../controllers/userController';

const router = express.Router();

router.route('/me').get(me);

export default router;
