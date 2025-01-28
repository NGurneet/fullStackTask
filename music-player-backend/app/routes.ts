import express from "express";
import userRoutes from "./user/user.route";
import playlistRoutes from "./playlist/playlist.route";
import songRoutes from "./song/song.route";
import folderRoutes from "./folder/folder.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/playlists", playlistRoutes);
router.use("/songs", songRoutes);
router.use("/folders", folderRoutes);

export default router;
