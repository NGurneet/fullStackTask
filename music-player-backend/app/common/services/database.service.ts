import mongoose from "mongoose";

/**
 * Initializes the connection to the MongoDB database.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the connection is successful.
 * @throws {Error} - Throws an error if the MongoDB URI is not provided.
 */

export const initDB = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGODB_URI ?? "";

    if (mongodbUri === "") throw new Error("mongod db uri not found!");
    // mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongodbUri)
      .then(() => {
        console.log("DB Connected!");
        resolve(true);
      })
      .catch(reject);
  });
};
