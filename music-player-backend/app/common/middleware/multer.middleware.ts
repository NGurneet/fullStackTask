import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the 'songs' directory exists, or create it
const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    fs.mkdirSync(dirname, { recursive: true });
    return true;
  }
};

// Configure storage settings
const storage = multer.diskStorage({

  /**
   * Sets the destination folder for storing uploaded files.
   * Ensures the specified folder exists, creating it if it does not.
   * Passes the folder path to the callback function.
   *
   * @param {Request} req - Unused request object.
   * @param {Express.Multer.File} file - Unused file object.
   * @param {Function} cb - Callback function to receive the destination folder path.
   */
  destination: function (req, file, cb) {
    const dir = "./songs";
    ensureDirectoryExistence(dir); // Ensure 'songs' directory exists
    cb(null, dir); // Store in songs folder
  },
/**
 * Generates a unique filename for the uploaded file by appending the current timestamp
 * to the original file extension.
 *
 * @param {Request} req - The request object (unused).
 * @param {Express.Multer.File} file - The file being uploaded, containing the original name.
 * @param {Function} cb - Callback function to pass the generated filename.
 */
/**
 * Generates a unique filename for the uploaded file by appending the current timestamp 
 * to the original file's extension.
 *
 * @param {Request} req - The request object (not utilized in this function).
 * @param {Express.Multer.File} file - The file being uploaded, providing the original name.
 * @param {Function} cb - Callback function to pass the generated unique filename.
 */


  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Allow any audio file type (any file with audio mime type)
const fileFilter = (req: any, file: any, cb: any) => {
  const mimetype = file.mimetype.startsWith("audio/");

  if (mimetype) {
    return cb(null, true); // Accept all audio files
  } else {
    cb(new Error("Invalid file type. Only audio files are allowed."), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
