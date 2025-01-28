import { v2 as cloudinary } from "cloudinary";
import {
  type UploadApiResponse,
  type UploadApiErrorResponse,
} from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary.
 *
 * @param {string} filePath - Path of the file to upload.
 * @param {string} folder - Name of the folder where the file will be uploaded in Cloudinary.
 * @returns {Promise<UploadApiResponse | null>} - Returns the uploaded file details or null on failure.
 */
export const uploadToCloudinary = async (
  filePath: string,
  folder: string,
): Promise<UploadApiResponse | null> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder, // Specify the folder in Cloudinary
      resource_type: "auto", // Auto-detect file type
    });

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};
