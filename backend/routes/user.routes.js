import { Router } from "express";
const userRouter = Router();

userRouter.route('/').get((req, res) => {
    res.send('hello')
})

export default userRouter