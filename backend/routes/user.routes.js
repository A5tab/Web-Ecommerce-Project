import { Router } from "express";
import { signup, login, logoutUser, refreshAccessToken } from "../controllers/user.controller.js"

import { multerUpload } from "../middlewares/multer.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.route("/signup").post(multerUpload.single("avatar"), signup)
userRouter.route("/login").post(login)
userRouter.route("/refreshAccessToken").get(refreshAccessToken)


// secure routes
userRouter.route("/logout").delete(authMiddleware(), logoutUser);

export default userRouter;