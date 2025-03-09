import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createCheckout = asyncHandler(async (req, res, next) => {
    const { cartProducts, customerEmail } = req.body;

    if (!cartProducts || !customerEmail) {
        throw new ApiError(400, "Product ID and Customer Email are required");
    }

    

    const payload = {
        customer_email: customerEmail,
        product_id: productId,
        success_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-failed",
    };

    try {
        console.log("Sending Checkout Payload:", JSON.stringify(payload, null, 2));

        const response = await axios.post(
            "https://sandbox-api.paddle.com/checkouts",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
                },
            }
        );

        if (!response.data || !response.data.data || !response.data.data.url) {
            throw new ApiError(500, "Invalid response from Paddle API");
        }

        return res.status(200).json(new ApiResponse(200, { checkoutUrl: response.data.data.url }, "Checkout created successfully"));
    } catch (error) {
        console.error("Paddle API Error:", error.response?.data || error.message);
        throw new ApiError(error.response?.status || 500, error.response?.data?.error?.detail || "Failed to create checkout session");
    }
});

export { createCheckout };
