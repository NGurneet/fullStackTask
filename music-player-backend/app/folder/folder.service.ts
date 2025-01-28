import mongoose from "mongoose";
import { IFolder } from "./folder.dto";
import FolderSchema from "./folder.schema";

/**
 * Creates a new folder in the database.
 * @param {IFolder} data - The folder data to create.
 * @returns {Promise<any>} - The created folder document.
 */
export const createFolder = async (data: IFolder): Promise<any> => {
  const result = await FolderSchema.create({ ...data, active: true });
  return result;
};

/**
 * Updates an existing folder in the database by its ID.
 * @param {string} id - The ID of the folder to update.
 * @param {IFolder} data - The folder data to update.
 * @returns {Promise<any>} - The updated folder document.
 */
export const updateFolder = async (id: string, data: IFolder): Promise<any> => {
  const result = await FolderSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

/**
 * Edits specific fields of a folder based on its ID.
 * @param {string} id - The ID of the folder to edit.
 * @param {Partial<IFolder>} data - The folder fields to update.
 * @returns {Promise<any>} - The updated folder document.
 */
export const editFolder = async (
  id: string,
  data: Partial<IFolder>,
): Promise<any> => {
  const result = await FolderSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

/**
 * Deletes a folder from the database.
 * @param {string} id - The ID of the folder to delete.
 * @returns {Promise<any>} - The result of the delete operation.
 */
export const deleteFolder = async (id: string): Promise<any> => {
  const result = await FolderSchema.deleteOne({ _id: id });
  return result;
};

/**
 * Retrieves a folder by its ID from the database.
 * @param {string} id - The ID of the folder to retrieve.
 * @returns {Promise<IFolder | null>} - The folder document if found, otherwise null.
 */
export const getFolderById = async (id: string): Promise<IFolder | null> => {
  const result = await FolderSchema.findById(id).lean();
  return result;
};

/**
 * Retrieves all folders from the database.
 * @returns {Promise<IFolder[]>} - A list of all folders.
 */
export const getAllFolders = async (): Promise<IFolder[]> => {
  const result = await FolderSchema.find({}).lean();
  return result;
};

/**
 * Retrieves folders by their parent folder ID.
 * @param {string} parentId - The ID of the parent folder.
 * @returns {Promise<IFolder[]>} - A list of folders under the given parent folder.
 */
export const getFoldersByParentId = async (
  parentId: string,
): Promise<IFolder[]> => {
  const result = await FolderSchema.find({ parentId }).lean();
  return result;
};

/**
 * Retrieves a list of files associated with a folder.
 * @param {string} folderId - The ID of the folder to retrieve files for.
 * @returns {Promise<any[]>} - The list of files in the folder.
 */
export const getFolderFiles = async (folderId: string): Promise<any[]> => {
  const result = await FolderSchema.findById(folderId).populate("files").lean();
  return result?.files || [];
};

export const findFolderByName = async (
  name: string,
): Promise<IFolder | null> => {
  try {
    const folder = await FolderSchema.findOne({ name });
    return folder; // Returns the folder if found or null if not.
  } catch (error) {
    console.error("Error finding folder by name:", error);
    throw new Error("Error finding folder by name");
  }
};
