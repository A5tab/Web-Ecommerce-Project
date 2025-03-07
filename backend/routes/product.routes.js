import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    getAllProducts, getSingleProduct,
    addProduct, updateProduct, deleteProduct
} from "../controllers/product.controller.js";

const productRouter = Router();
productRouter.route('/get-all-products').get(getAllProducts)
productRouter.route('/get-single-product/:id').get(getSingleProduct)
productRouter.route('/add-product').post(authMiddleware('admin'), multerUpload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
]), addProduct);
productRouter.route('/update-products/:id').put(authMiddleware('admin'), multerUpload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
]), updateProduct)
productRouter.route('/delete-products/:id').delete(authMiddleware('admin'), deleteProduct)

export default productRouter