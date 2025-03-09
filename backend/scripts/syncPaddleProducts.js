import axios from "axios";
import dotenv from "dotenv";
import Product from "../models/product.model.js";
import connectDB from "../db/index.js";

dotenv.config();

const createProductsInPaddle = async () => {
    try {
        await connectDB();

        const products = await Product.find();
        if (!products.length) {
            console.log("No products found!");
            process.exit(0);
        }

        for (const product of products) {
            try {
                if (!product.paddleProductId) {
                    const productPayload = {
                        name: product.title,
                        tax_category: "standard",
                        description: product.description || "No description available",
                        image_url: product.mainImage || null,
                        type: "standard",
                        custom_data: {
                            customer_reference_id: product._id.toString()
                        }
                    };

                    console.log("Creating Paddle product:", JSON.stringify(productPayload, null, 2));
                    const productResponse = await axios.post(
                        "https://sandbox-api.paddle.com/products",
                        productPayload,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
                            }
                        }
                    );

                    product.paddleProductId = productResponse.data.data.id;
                    await product.save();
                }

                const pricePayload = {
                    product_id: product.paddleProductId,
                    unit_price: {
                        amount: product.price.toString(),
                        currency_code: "USD"
                    },
                    description: `Pricing for ${product.title}`,
                };

                console.log("Creating Paddle price:", JSON.stringify(pricePayload, null, 2));
                const priceResponse = await axios.post(
                    "https://sandbox-api.paddle.com/prices",
                    pricePayload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
                        }
                    }
                );

                console.log(`Price added for product ${product.title}:`, priceResponse.data);
            } catch (error) {
                console.error(`Error syncing product "${product.title}":`, error.response?.data || error.message);
            }
        }
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    } finally {
        process.exit(0);
    }
};


createProductsInPaddle();
