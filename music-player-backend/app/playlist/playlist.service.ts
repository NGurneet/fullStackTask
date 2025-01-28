import { type IPlaylist } from "./playlist.dto";
import PlaylistSchema from "./playlist.schema";


/**
 * Creates a new playlist record in the database.
 * @param {IPlaylist} data - The playlist data to create.
 * @returns {Promise<IPlaylist>} - The newly created playlist document containing details such as name, createdBy, songs, etc.
 */
export const createPlaylist = async (data: IPlaylist) => {
  const result = await PlaylistSchema.create({ ...data, active: true });
  return result;
};
/**
 * Updates an existing playlist in the database by its ID.
 * @param {string} id - The ID of the playlist to update.
 * @param {IPlaylist} data - The playlist data to update.
 * @returns {Promise<IPlaylist>} - The updated playlist document.
 */

export const updatePlaylist = async (id: string, data: IPlaylist) => {
  const result = await PlaylistSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

/**
 * Edits specific fields of an existing playlist by its ID.
 * @param {string} id - The ID of the playlist to edit.
 * @param {Partial<IPlaylist>} data - The playlist fields to update.
 * @returns {Promise<IPlaylist>} - The updated playlist document.
 */
export const editPlaylist = async (id: string, data: Partial<IPlaylist>) => {
  const result = await PlaylistSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};


/**
 * Deletes a playlist from the database.
 * @param {string} id - The ID of the playlist to delete.
 * @returns {Promise<DeleteResult>} - The result of the deletion operation.
 */
export const deletePlaylist = async (id: string) => {
  const result = await PlaylistSchema.deleteOne({ _id: id });
  return result;
};



/**
 * Retrieves a playlist document from the database by its ID.
 * @param {string} id - The ID of the playlist to retrieve.
 * @returns {Promise<IPlaylist | null>} - The playlist document if found, otherwise null.
 */
export const getPlaylistById = async (id: string) => {
  const result = await PlaylistSchema.findById(id).lean();
  return result;
};



/**
 * Retrieves all playlists from the database.
 * @returns {Promise<IPlaylist[]>} - An array of playlist documents.
 */
export const getAllPlaylist = async () => {
  const result = await PlaylistSchema.find({}).lean();
  return result;
};
