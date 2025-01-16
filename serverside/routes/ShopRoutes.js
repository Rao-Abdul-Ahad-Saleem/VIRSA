import express from 'express';
import { addShop, deleteShop } from '../controller/shopcontroller.js';
import { upload } from '../middleware/multer.js';
import { protectedSeller } from '../middleware/protected.js';



const shopRouter = express.Router();

shopRouter.route("/add").post(protectedSeller, upload.fields([
    { name: "businessLogo", maxCount: 1 },
    { name: "businessBanner", maxCount: 1 },
]), addShop);

shopRouter.route("/delete/:id").delete(deleteShop);

export default shopRouter 