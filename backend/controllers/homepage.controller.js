import homepage from "../models/homepage.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getHomepageImages = asyncHandler(async (req, res) => {
    const homepageImages = await homepage.findAll()
    if (!homepageImages) {
        throw new ApiError(404, "No homepage images found")
    }

    res.status(200).json(new ApiResponse(200, homepageImages, "Homepage images fetched successfully"))
})

const addHomepageImage = asyncHandler(async (req, res) => {
    if (!req.files || !req.files.length === 0) {
        throw new ApiError(400, "At least one homepage image is required")
    }

    const images_urls = []
    const uploadPromises = req.files.map(async (file) => {
        try {
            const response = await uploadOnCloudinary(file.path)
            if (response) {
                images_urls.push(response.url)
            }
        } catch (error) {
            throw new ApiError(500, "Failed to upload image to Cloudinary")
        }
    })
    await Promise.all(uploadPromises)

    const homepageImage = await homepage.create({
        images: images_urls
    })

    if (!homepageImage) {
        throw new ApiError(500, "Failed to add homepage image")
    }

    res.status(200).json(new ApiResponse(200, homepageImage, "Homepage image added successfully"))
})

const deleteHomePageImage = asyncHandler(async (req, res) => {
    const homepageImage = await homepage.findById(req.params.id)
    if (!homepageImage) {
        throw new ApiError(404, "Homepage image not found")
    }
    const deletedHomePageImage = await homepage.findByIdAndDelete(req.params.id)

    if (!deletedHomePageImage) {
        throw new ApiError(404, "Homepage image not deleted")
    }

    res.status(200).json(new ApiResponse(200, deletedHomePageImage, "Homepage image deleted successfully"))
})

export { getHomepageImages, addHomepageImage, deleteHomePageImage }
