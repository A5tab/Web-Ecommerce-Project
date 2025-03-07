import { Router } from "express";
import { getHomepageImages, addHomepageImage, deleteHomePageImage } from "../controllers/homepage.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const homepageRouter = Router();

homepageRouter.route('/get-homepage-images').get(authMiddleware('admin', 'user') ,getHomepageImages)
homepageRouter.route('/add-homepage-image').post(authMiddleware('admin') ,addHomepageImage)
homepageRouter.route('/delete-homepage-image').delete(authMiddleware('admin') ,deleteHomePageImage)

export default homepageRouter