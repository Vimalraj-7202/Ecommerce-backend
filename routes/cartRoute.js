import express from 'express';
import {addToCart,removeFromCart,getCart,clearCart} from '../controllers/cartController.js';

const router = express.Router();
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.get('/', getCart);
router.delete('/clear', clearCart);

export default router;
