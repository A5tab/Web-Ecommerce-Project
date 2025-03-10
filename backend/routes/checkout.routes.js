import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createCheckout } from "../controllers/checkout.controller.js"

const checkoutRouter = Router();

checkoutRouter.route('/create-checkout').post(authMiddleware('user'), createCheckout);


export default checkoutRouter;