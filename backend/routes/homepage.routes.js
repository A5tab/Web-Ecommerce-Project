import { Router } from "express";
import { getHomepageImages, addHomepageImage, deleteHomePageImage } from "../controllers/homepage.controller.js";

const homepageRouter = Router();

homepageRouter.route('/get-homepage-images').get(getHomepageImages)
homepageRouter.route('/add-homepage-image').post(addHomepageImage)
homepageRouter.route('/delete-homepage-image').delete(deleteHomePageImage)

export default homepageRouter