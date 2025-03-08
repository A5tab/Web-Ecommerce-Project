import axios from "axios";
import dotenv from "dotenv";
import Product from "../models/product.model.js";
import connectDB from "../db/index.js";

dotenv.config();

const createProductsInPaddle = async () => {
    try {
        await connectDB();
        console.log(process.env.PADDLE_API_KEY);
        
        const products = await Product.find();

        if (!products.length > 0) {
            console.log("No products found!");
            process.exit(0);
        }
        for (const product of products) {
            try {
                const payload = {
                    name: product.title,
                    tax_category: "standard",
                    description: product.description || "No description available",
                    image_url: product.mainImage || null,
                    type: "standard",
                    custom_data: {
                        customer_reference_id: product._id.toString() // Using MongoDB ObjectId as reference
                    }
                }

                console.log("Sending payload:", JSON.stringify(payload, null, 2));
                const response = await axios.post(
                    "https://sandbox-api.paddle.com/products",
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
                        }
                    }
                );

                product.paddleProductId = response.data.data.id;
                await product.save();
            } catch (productError) {
                console.error(`Error syncing product "${product.name}":`, productError.response?.data || productError.message);
            }
        }
        console.log("All products synced with Paddle!");
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    } finally {
        process.exit(0);
    }
};

createProductsInPaddle();