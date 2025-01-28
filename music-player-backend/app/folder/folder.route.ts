import express from "express";
import * as folderController from "./folder.controller";
import * as folderValidator from "./folder.validatiion";

const router = express.Router();

/**
 * POST /api/folders
 * Route to create a new folder.
 * It invokes the `createFolder` controller to handle folder creation logic.
 */
router.post("/", folderValidator.createFolder, folderController.createFolder);

/**
 * PUT /api/folders/:id
 * Route to update an existing folder by ID.
 * It invokes the `updateFolder` controller to handle folder updating.
 * @param {string} id - The ID of the folder to be updated (passed as a parameter in the route).
 */
router.put("/:id", folderValidator.updateFolder, folderController.updateFolder);

/**
 * PATCH /api/folders/:id
 * Route to partially update an existing folder by ID.
 * It invokes the `editFolder` controller to handle partial updates to the folder.
 * @param {string} id - The ID of the folder to be updated (passed as a parameter in the route).
 */
router.patch("/:id", folderValidator.editFolder, folderController.editFolder);

/**
 * DELETE /api/folders/:id
 * Route to delete a folder by ID.
 * It invokes the `deleteFolder` controller to handle the folder deletion.
 * @param {string} id - The ID of the folder to be deleted (passed as a parameter in the route).
 */
router.delete("/:id", folderController.deleteFolder);

/**
 * GET /api/folders/:id
 * Route to get a folder by ID.
 * It invokes the `getFolderById` controller to retrieve folder data.
 * @param {string} id - The ID of the folder to fetch (passed as a parameter in the route).
 */
router.get("/:id", folderController.getFolderById);

/**
 * GET /api/folders
 * Route to get all folders.
 * It invokes the `getAllFolders` controller to retrieve a list of folders.
 */
router.get("/", folderController.getAllFolders);

export default router;
