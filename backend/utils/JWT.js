import jwt from 'jsonwebtoken';
import { ApiError } from './ApiError.js';

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
}

export const verifyToken = (token) => {
    if (!token) throw new ApiError(401, "Token is missing");
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};


