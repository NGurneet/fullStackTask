import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: "dadcbzu6u",
  api_key: "468259489439831",
  api_secret: "evgUJZhvz6gws8fl05fw-wFaXHw",
});

export const uploadToCloudinary = async (filePath: string) => {
  try {
    // Make sure resource type is set to 'auto' or 'raw' for audio files
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Explicitly upload as 'raw' file type (for non-image files)
      public_id: `songs/${Date.now()}_${path.basename(filePath)}`, // Unique ID
    });

    return result; // Return cloud service response
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};
