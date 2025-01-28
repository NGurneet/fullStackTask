import * as playlistService from "./playlist.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

/**
 * Creates a new playlist.
 * @param {Request} req - The Express request object containing playlist data.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the playlist creation.
 */
export const createPlaylist = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await playlistService.createPlaylist(req.body);
    res.send(createResponse(result, "Playlist created successfully"));
  },
);

/**
 * Updates an existing playlist by its ID.
 * @param {Request} req - The Express request object containing the playlist ID in the params and the data in the body.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the playlist update.
 */
export const updatePlaylist = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await playlistService.updatePlaylist(req.params.id, req.body);
    res.send(createResponse(result, "Playlist updated successfully"));
  },
);

/**
 * Edits specific fields of an existing playlist by its ID.
 * @param {Request} req - The Express request object containing the playlist ID in the params and the updated data in the body.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the playlist update.
 */
export const editPlaylist = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await playlistService.editPlaylist(req.params.id, req.body);
    res.send(createResponse(result, "Playlist updated successfully"));
  },
);

/**
 * Deletes an existing playlist by its ID.
 * @param {Request} req - The Express request object containing the playlist ID in the params.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the playlist deletion.
 */
export const deletePlaylist = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await playlistService.deletePlaylist(req.params.id);
    res.send(createResponse(result, "Playlist deleted successfully"));
  },
);

/**
 * Retrieves a playlist by its ID.
 * @param {Request} req - The Express request object containing the playlist ID in the params.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the playlist data or an error if not found.
 */
export const getPlaylistById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await playlistService.getPlaylistById(req.params.id);
    res.send(createResponse(result));
  },
);

/**
 * Retrieves all playlists from the database.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object to send the list of playlists.
 * @returns {Promise<void>} - Sends the response with the list of playlists.
 */
export const getAllPlaylist = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await playlistService.getAllPlaylist();
    res.send(createResponse(result));
  },
);

