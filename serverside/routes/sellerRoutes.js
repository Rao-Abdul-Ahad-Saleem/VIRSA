import express from 'express';
import { add_shop, DeleteSeller, getProfile, login_seller, logout_seller, register_seller, sellers_data, updateSeller } from '../controller/sellerController.js';
import { protectedSeller } from '../middleware/protected.js';

const sellerRouter = express.Router();

sellerRouter.route('/register').post(register_seller);
sellerRouter.route('/login').post(login_seller);
sellerRouter.route('/logout').post(logout_seller)
sellerRouter.route('/delete/:id').delete(DeleteSeller)
sellerRouter.route('/data').get(sellers_data)
sellerRouter.route('/profile').get(protectedSeller, getProfile)
sellerRouter.route('/update/:id').put(updateSeller) // patch method to update the partial data of seller not the whole data to update
sellerRouter.route('/addShop/:id').patch(add_shop);

export default sellerRouter;