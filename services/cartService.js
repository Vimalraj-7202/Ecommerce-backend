import Cart from '../models/cartModel.js';

export const addToCart = async (userId, { productId, quantity }) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      Products: [{ productId, quantity: quantity || 1 }]
    });
  } else {
    const index = cart.Products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (index !== -1) {
      cart.Products[index].quantity += quantity || 1;
    } else {
      cart.Products.push({ productId, quantity: quantity || 1 });
    }
  }

  return await cart.save();
};

export const getCart = async (userId) => {
  return await Cart.findOne({ userId }).populate('Products.productId');
};

export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  cart.Products = cart.Products.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  return await cart.save();
};

export const clearCart = async (userId) => {
  return await Cart.findOneAndDelete({ userId });
};
