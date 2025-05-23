import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// routes import 
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import configRouter from "./routes/config.routes.js"
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js"
// routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/config", configRouter)

app.use(globalErrorHandler);
export { app }