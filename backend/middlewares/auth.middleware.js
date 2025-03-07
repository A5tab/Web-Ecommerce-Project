import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';

export const authMiddleware = (...validRoles) => {
    return asyncHandler(async (req, _, next) => {

        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!accessToken) {
            throw new ApiError(401, "Access Token is missing!!!");
        }

        try {
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decodedToken.id).select("-password -refreshToken");

            if (!user) {
                throw new ApiError(401, "Unauthorized request!!!");
            }

            if (validRoles.length && !validRoles.includes(user.role)) {
                throw new ApiError(403, "Access Denied!!!");
            }

            req.user = user;
            next();
        } catch (error) {
            throw new ApiError(401, "Invalid or Expired Access Token!");
        }
    })
};
