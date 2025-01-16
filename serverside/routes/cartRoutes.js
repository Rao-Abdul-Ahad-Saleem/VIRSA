import express from 'express'
import { protectedCustomer } from '../middleware/protected.js';
import { addToCart, getCartItems, removeFromCart, updateQuantity } from '../controller/cartController.js';

const cartRouter = express.Router();

cartRouter.route('/addToCart').post(protectedCustomer, addToCart);
cartRouter.route('/removeFromCart/:productId').delete(protectedCustomer, removeFromCart);
cartRouter.route('/updateQuantity/:productId').put(protectedCustomer, updateQuantity);
cartRouter.route('/getCartItems').get(protectedCustomer, getCartItems);

export default cartRouter;