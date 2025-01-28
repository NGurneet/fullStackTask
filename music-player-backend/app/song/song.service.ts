import { type ISong } from "./song.dto";
import SongSchema from "./song.schema";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { createResponse } from "../common/helper/response.hepler";
import { uploadToCloudinary } from "./song.utils";
import songSchema from "./song.schema";

/**
 * Uploads a song file to Cloudinary and creates a song record in the database.
 *
 * @param {Express.Multer.File} file - The song file to be uploaded.
 * @param {string} userId - The ID of the user uploading the song.
 * @returns {Promise<any>} - The newly created song document containing details such as title, url, size, etc.
 * @throws {Error} - Throws an error if the upload or database operation fails.
 */

/**
 * Uploads a song file to Cloudinary and creates a song record in the database.
 *
 * @param {Express.Multer.File} file - The song file to be uploaded.
 * @param {string} userId - The ID of the user uploading the song.
 * @returns {Promise<ISong>} - The newly created song document containing details such as title, url, size, etc.
 * @throws {Error} - Throws an error if the upload or database operation fails.
 */
export const uploadSong = async (file: Express.Multer.File, userId: string) => {
  try {
    // Upload file to Cloudinary
    const result = await uploadToCloudinary(file.path);

    // Create a new song record in the database
    const newSong = await SongSchema.create({
      title: file.originalname,
      songUrl: result.secure_url, // Cloudinary URL of the uploaded file
      size: file.size,
      artist: "Unknown", // You may update this once you have metadata
      album: "Unknown", // Similarly, fill in other metadata
      genre: "Unknown",
      lyrics: "Unknown",
      mimeType: file.mimetype,
      uploadedBy: userId, // Attach the user who uploaded the file
    });

    return newSong;
  } catch (error) {
    console.error("Song upload failed:", error);
    throw new Error("Failed to upload the song.");
  }
};
/**
 * Creates a new song record in the database.
 *
 * @param {ISong} data - The song data to be stored in the database.
 * @returns {Promise<ISong>} - The newly created song document containing details such as title, url, size, etc.
 */
export const createSong = async (data: ISong) => {
  const result = await SongSchema.create({ ...data, active: true });
  return result;
};


/**
 * Updates an existing song record in the database.
 *
 * @param {string} id - The ID of the song to be updated.
 * @param {ISong} data - The updated song data to be stored in the database.
 * @returns {Promise<ISong>} - The updated song document containing details such as title, url, size, etc.
 */
export const updateSong = async (id: string, data: ISong) => {
  const result = await SongSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

/**
 * Edits specific fields of a song based on its ID.
 * @param {string} id - The ID of the song to edit.
 * @param {Partial<ISong>} data - The song fields to update.
 * @returns {Promise<ISong>} - The updated song document.
 */
export const editSong = async (id: string, data: Partial<ISong>) => {
  const result = await SongSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

/**
 * Deletes a song record from the database.
 *
 * @param {string} id - The ID of the song to be deleted.
 * @returns {Promise<DeleteResult>} - The result of the deletion operation.
 */
export const deleteSong = async (id: string) => {
  const result = await SongSchema.deleteOne({ _id: id });
  return result;
};

/**
 * Retrieves a song document from the database by its ID.
 *
 * @param {string} id - The ID of the song to retrieve.
 * @returns {Promise<ISong | null>} - The song document if found, otherwise null.
 */
export const getSongById = async (id: string) => {
  const result = await SongSchema.findById(id).lean();
  return result;
};

/**
 * Retrieves all song documents from the database.
 *
 * @returns {Promise<ISong[]>} - An array of song documents.
 */

export const getAllSong = async () => {
  const result = await SongSchema.find({}).lean();
  return result;
};
