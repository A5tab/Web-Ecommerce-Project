import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to Upload Files to Cloudinary
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resourceType: "auto",
        });

        // fs.unlinkSync(localFilePath); // Remove local file after successful upload
        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error: ", error);
        // fs.unlinkSync(localFilePath); // Remove local file even on failure
        return null;
    }
};
