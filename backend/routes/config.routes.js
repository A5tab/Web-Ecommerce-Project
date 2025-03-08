import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { get_api_keys } from "../controllers/config.controller.js";
const configRouter = Router();

configRouter.route('/get_api_keys').get(authMiddleware("admin"), get_api_keys);
export default configRouter;