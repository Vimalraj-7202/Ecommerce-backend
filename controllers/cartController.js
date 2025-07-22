import * as cartService from '../services/cartService.js';
import { handleError } from '../utils/errorHandler.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;  
    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId and productId are required' });
    }

    const cart = await cartService.addToCart(userId, { productId, quantity });
    res.status(200).json(cart);
  } catch (err) {
    handleError(res, err);
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const cart = await cartService.getCart(userId);
    res.status(200).json(cart);
  } catch (err) {
    handleError(res, err); 
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId and productId are required' });
    }

    const cart = await cartService.removeFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (err) {
    handleError(res, err);
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    await cartService.clearCart(userId);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
};
