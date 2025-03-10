import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createCheckout = asyncHandler(async (req, res) => {
    const { cartProducts } = req.body;
    const { _id: customerId } = req.user;

    if (!cartProducts) {
        throw new ApiError(400, "Cart products and customer email are required");
    }

    const payload = {
        collection_mode: "automatic",  // Ensures Paddle collects payment
        customer_id: customerId,
        items: cartProducts.map(product => ({
            price_id: product.paddlePriceId,
            quantity: product.quantity || 1,
        })),
        currency_code: 'USD',
        checkout: {
            url: 'http://localhost:5173/checkoutSuccess'
        }
    };

    try {
        console.log("Sending Checkout Payload:", JSON.stringify(payload, null, 2));

        const { data } = await axios.post(
            "https://sandbox-api.paddle.com/transactions",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
                },
            }
        );

        if (!data?.data?.url) {
            throw new ApiError(500, "Invalid response from Paddle API");
        }

        res.status(200).json(new ApiResponse(200, { checkoutUrl: data.data.url }, "Checkout created successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to create checkout");
    }
});

export { createCheckout };
