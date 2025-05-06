import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyToken, generateRefreshToken, generateAccessToken } from "../utils/JWT.js";

const isProduction = process.env.NODE_ENV === "production"

const refreshTokenOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const isPasswordCorrect = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}
const login = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Email or username is required");
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const passwordCorrect = await isPasswordCorrect(password, user.password);

    if (!passwordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    return res.
        status(200).
        cookie('refreshToken', refreshToken, refreshTokenOptions).
        json(new ApiResponse(200, { user: loggedInUser, accessToken }, "User logged in successfully"))

})

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    [username, email, password].some((field) => {
        if (!field || field.trim() === "") {
            throw new ApiError(400, "All fields are required");
        }
    })
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new ApiError(409, "User already exists");
    }

    let avatarUrl;
    if (req.files?.avatar) {
        const avatar = req.files?.avatar || req.files?.avatar[0];
        avatarUrl = await uploadOnCloudinary(avatar.path);
        if (!avatarUrl) {
            throw new ApiError(500, "Failed to upload avatar to Cloudinary");
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
        username,
        email,
        password: hashedPassword,
        avatar: avatarUrl?.url,
    });

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    const accessToken = generateAccessToken(createdUser);
    const refreshToken = generateRefreshToken(createdUser);
    createdUser.refreshToken = refreshToken;
    await createdUser.save({ validateBeforeSave: false });

    const user = await User.findById(createdUser._id).select("-password -refreshToken");


    return res.status(201).
        cookie('refreshToken', refreshToken, refreshTokenOptions).
        json(new ApiResponse(201, { user, accessToken }, "User created successfully"));
})

const getCurrentuser = asyncHandler((req, res) => {
    return res.
        status(200).
        json(new ApiResponse(200, req.user, "User fetched successfully"))
})

const logoutUser = asyncHandler(async (req, res) => {
    // await User.findByIdAndUpdate(
    //     req.user._id,
    //     {
    //         $unset: {
    //             refreshToken: 1 // this removes the field from document
    //         }
    //     },
    //     {
    //         new: true
    // } // setting new: true returns an updated response from db

    // )


    const refreshToken = req?.cookies?.refreshToken;
    
    if (!refreshToken) throw new ApiError(400, 'No refresh token provided');
    const user = await User.findOne({ refreshToken });

    if (!user) {
        throw new ApiError(403, 'Invalid token');
    }

    const updatedUser = await User.findOneAndUpdate({ refreshToken }, { $unset: { refreshToken: 1 } }, { new: true });
    console.log(updatedUser);


    return res.status(200).clearCookie('refreshToken', refreshTokenOptions).json({ message: "Logged out successfully" });
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    if (!req.cookies?.refreshToken) {
        throw new ApiError(401, "Refresh token is missing");
    }
    try {
        let decodedToken = verifyToken(req.cookies?.refreshToken);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            throw new ApiError(401, "Unauthorized user");
        }
        if (req.cookies?.refreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used");
        }

        const accessToken = generateAccessToken(user);
        // const newRefreshToken = generateRefreshToken(user);
        // we could also update reftoken along with when access token is refreshed for long login states

        // user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });
        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
        return res.status(200)
            // .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
            .json(new ApiResponse(200, { loggedInUser, accessToken }, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, "Invalid Refresh Token");
    }
})

export {
    login,
    signup,
    getCurrentuser,
    logoutUser,
    refreshAccessToken
}

