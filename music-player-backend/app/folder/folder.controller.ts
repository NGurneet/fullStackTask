import * as folderService from "./folder.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

/**
 * Creates a new folder by calling the folder service.
 * @param {Request} req - The Express request object containing folder data.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the folder creation.
 */
export const createFolder = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const existingFolder = await folderService.findFolderByName(name);
    if (existingFolder) {
      throw new Error("Folder already exists");
    }
    const result = await folderService.createFolder(req.body);
    res.send(createResponse(result, "Folder created successfully"));
  },
);

/**
 * Updates an existing folder by its ID.
 * @param {Request} req - The Express request object containing the folder ID in the params and the data in the body.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the folder update.
 */
export const updateFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await folderService.updateFolder(req.params.id, req.body);
    res.send(createResponse(result, "Folder updated successfully"));
  },
);

/**
 * Edits specific fields of an existing folder by its ID.
 * @param {Request} req - The Express request object containing the folder ID in the params and the updated data in the body.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the folder update.
 */
export const editFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await folderService.editFolder(req.params.id, req.body);
    res.send(createResponse(result, "Folder updated successfully"));
  },
);

/**
 * Deletes an existing folder by its ID.
 * @param {Request} req - The Express request object containing the folder ID in the params.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the result of the folder deletion.
 */
export const deleteFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await folderService.deleteFolder(req.params.id);
    res.send(createResponse(result, "Folder deleted successfully"));
  },
);

/**
 * Retrieves a folder by its ID.
 * @param {Request} req - The Express request object containing the folder ID in the params.
 * @param {Response} res - The Express response object to send the result.
 * @returns {Promise<void>} - Sends the response with the folder data or an error if not found.
 */
export const getFolderById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await folderService.getFolderById(req.params.id);
    res.send(createResponse(result));
  },
);

/**
 * Retrieves all folders from the database.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object to send the list of folders.
 * @returns {Promise<void>} - Sends the response with the list of folders.
 */
export const getAllFolders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await folderService.getAllFolders();
    res.send(createResponse(result));
  },
);
