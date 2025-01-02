import { Router } from "express";
import { multerUpload } from "../middlewares/multer.middleware.js";
import {
    getAllProducts, getSingleProduct,
    addProduct, updateProduct, deleteProduct, addQuantity
} from "../controllers/product.controller.js";
const productRouter = Router();
productRouter.route('/get-all-products').get(getAllProducts)
productRouter.route('/get-single-product/:id').get(getSingleProduct)
productRouter.route('/add-product').post(multerUpload.array('images', 6), addProduct)
productRouter.route('/update-products/:id').put(multerUpload.array('images', 6), updateProduct)
productRouter.route('/delete-products/:id').delete(deleteProduct)
productRouter.route('/add-quantity/:id').post(addQuantity)
export default productRouter