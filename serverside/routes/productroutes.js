import express from 'express';
import { addProduct, deleteProduct, getAllProducts, singleProduct, } from '../controller/productcontroller.js';
import { processImage, upload } from '../middleware/multer.js';
import { protectedSeller } from '../middleware/protected.js';

const productRoutes = express.Router()

productRoutes.route("/getAllProducts").get(getAllProducts);
productRoutes.route("/getSingleProduct/:id").get(singleProduct);
productRoutes.route("/add").post(protectedSeller, upload.array("images", 5), processImage, addProduct);
productRoutes.route("/delete/:id").delete(deleteProduct);

export default productRoutes