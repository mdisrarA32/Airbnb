import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if (!filepath) {
            return null;
        }

        // Verify file exists before uploading
        if (!fs.existsSync(filepath)) {
            console.warn(`File not found at path: ${filepath}`);
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filepath);

        // Safe delete after successful upload
        try {
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        } catch (unlinkError) {
            console.error("Error deleting file after upload:", unlinkError);
        }

        return uploadResult.secure_url;

    } catch (error) {
        // Safe delete on upload failure
        try {
            if (filepath && fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        } catch (unlinkError) {
            console.error("Error deleting file on failure:", unlinkError);
        }

        console.error("Cloudinary upload error:", error);
        return null;
    }
}

export default uploadOnCloudinary

