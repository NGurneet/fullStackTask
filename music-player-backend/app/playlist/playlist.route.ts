import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as playlistController from "./playlist.controller";
import * as playlistValidator from "./playlist.validation";
import validateToken from "../common/middleware/auth.middleware";

const router = Router();

router
  .get("/", validateToken,playlistController.getAllPlaylist)
  .get("/:id", validateToken,playlistController.getPlaylistById)
  .delete("/:id", validateToken,playlistController.deletePlaylist)
  .post(
    "/",
    playlistValidator.createPlaylist,
    catchError,
    playlistController.createPlaylist,
  )
  .put(
    "/:id",
    playlistValidator.updatePlaylist,
    validateToken,
    catchError,
    playlistController.updatePlaylist,
  )
  .patch(
    "/:id",
    playlistValidator.editPlaylist,
    validateToken,
    catchError,
    playlistController.editPlaylist,
  );

export default router;
