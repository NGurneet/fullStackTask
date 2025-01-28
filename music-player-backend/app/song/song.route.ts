import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as songController from "./song.controller";
import * as songValidator from "./song.validation";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import validateToken from "../common/middleware/auth.middleware";
import { upload } from "../common/middleware/multer.middleware";
// import { compressFile } from "../common/middleware/file-middleware";
import { uploadSong } from "./song.controller";

const router = Router();

router
  .get("/", validateToken,songController.getAllSong)
  .get("/:id", validateToken,songController.getSongById)
  .delete("/:id", validateToken,songController.deleteSong);
router
  .post(
    "/upload",
    roleAuth("ADMIN"),
    validateToken, // Middleware for role-based access
    upload.single("file"), // Use multer's single file upload middleware
    // compressFile, // Compress file if necessary
    uploadSong, // Controller to save file details
  )
  // .post("/", songValidator.createSong, catchError, songController.createSong)
  .put("/:id", songValidator.updateSong,validateToken, catchError, songController.updateSong)
  .patch("/:id", songValidator.editSong, validateToken,catchError, songController.editSong);

export default router;
