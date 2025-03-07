import { asyncHandler } from "../utils/asyncHandler.js"
import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    if (!products) {
        throw new ApiError(404, "No products found")
    }

    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"))
})

const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }
    res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"))
})

const addProduct = asyncHandler(async (req, res) => {
    const { title, description, price, stock, features, category } = req.body;

    if ([title, description, price, stock, features, category].map((f) => { return String(f) }).some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "At least one product image is required");
    }

    // Separate mainImage and additional images
    const mainImageFile = req.files.mainImage || req.files.mainImage[0]; // First file as main image
    const otherImageFiles = req.files.images || req.files.images.slice(0); // Rest as additional images

    // Upload mainImage
    const mainImage = await uploadOnCloudinary(mainImageFile.path);
    if (!mainImage) {
        throw new ApiError(500, "Failed to upload main image to Cloudinary");
    }

    // Upload additional images
    const images_urls = [];
    const uploadPromises = otherImageFiles.map(async (file) => {
        try {
            const response = await uploadOnCloudinary(file.path);
            if (response) {
                images_urls.push(response.url);
            }
        } catch (error) {
            throw new ApiError(500, "Failed to upload image to Cloudinary");
        }
    });

    await Promise.all(uploadPromises);

    // Create product
    const product = await Product.create({
        title,
        description,
        price,
        stock,
        features,
        category,
        mainImage: mainImage.url,
        images: images_urls,
    });

    res.status(200).json(new ApiResponse(200, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
        throw new ApiError(404, "Product not found");
    }

    const { title, description, price, stock, features, category } = req.body;

    // Validate required fields
    if ([title, description, price, stock, features, category].map((f) => { return String(f) }).some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    let images_urls = existingProduct.images || []; // Retain existing images if no new ones are uploaded

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(async (file) => {
            try {
                const response = await uploadOnCloudinary(file.path);
                if (response) {
                    images_urls.push(response.url);
                }
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error.message);
                throw new ApiError(500, "Failed to upload image to Cloudinary");
            }
        });
        await Promise.all(uploadPromises);
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            title,
            description,
            price,
            stock,
            features,
            category,
            images: images_urls,
        },
        { new: true } // Return the updated document
    );

    // Respond with success
    res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        throw new ApiError(404, "Product not found");
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        throw new ApiError(404, "Product not deleted");
    }

    res.status(200).json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
});



export {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}