import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const get_api_keys = asyncHandler(async (_, res) => {
    return res.status(200).json(new ApiResponse(201, { RTE_API_KEY: process.env.RTE_API_KEY }));
})

export {
    get_api_keys
}