/**
 * Controller for handling song related operations
 */
import * as songService from "./song.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

/**
 * Uploads a song and stores its metadata in the database
 * @param req - The Express request object containing the song file
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the uploaded song's metadata
 */
export const uploadSong = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Check if file is present
    if (!req.file) {
      res.status(400).send(createResponse(null, "No Song provided"));
      return;
    }

    // Ensure 'folder' field exists (default to "default")
    const folder = req.body.folder || "default";

    // Get 'userId' from the request (presumably from authentication)
    const userId = req.user?._id;
    if (!userId) {
      res.status(400).send(createResponse(null, "User not authenticated"));
      return;
    }

    // Call the service to upload the song and store metadata in DB
    const fileData = await songService.uploadSong(req.file, userId);

    // Send success response back to the user
    res
      .status(201)
      .send(createResponse(fileData, "File uploaded successfully"));
  },
);

/**
 * Creates a new song
 * @param req - The Express request object containing the song data
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the created song's metadata
 */
export const createSong = asyncHandler(async (req: Request, res: Response) => {
  const result = await songService.createSong(req.body);
  res.send(createResponse(result, "Song created sucssefully"));
});

/**
 * Updates an existing song
 * @param req - The Express request object containing the song ID and updated data
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the updated song's metadata
 */
export const updateSong = asyncHandler(async (req: Request, res: Response) => {
  const result = await songService.updateSong(req.params.id, req.body);
  res.send(createResponse(result, "Song updated sucssefully"));
});

/**
 * Edits an existing song
 * @param req - The Express request object containing the song ID and updated data
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the updated song's metadata
 */
export const editSong = asyncHandler(async (req: Request, res: Response) => {
  const result = await songService.editSong(req.params.id, req.body);
  res.send(createResponse(result, "Song updated sucssefully"));
});

/**
 * Deletes a song
 * @param req - The Express request object containing the song ID
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the deleted song's metadata
 */
export const deleteSong = asyncHandler(async (req: Request, res: Response) => {
  const result = await songService.deleteSong(req.params.id);
  res.send(createResponse(result, "Song deleted sucssefully"));
});

/**
 * Gets a song by its ID
 * @param req - The Express request object containing the song ID
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the song's metadata
 */
export const getSongById = asyncHandler(async (req: Request, res: Response) => {
  const result = await songService.getSongById(req.params.id);
  res.send(createResponse(result));
});

/**
 * Gets all songs
 * @param req - The Express request object
 * @param res - The Express response object to send the response
 * @returns {Promise<void>} - Sends the response with the songs' metadata
 */
export const getAllSong = asyncHandler(async (req: Request, res: Response) => {
  const result = await songService.getAllSong();
  res.send(createResponse(result));
});

