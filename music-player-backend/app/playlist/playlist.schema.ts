import mongoose from "mongoose";
import { type IPlaylist } from "./playlist.dto";

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema<IPlaylist>(
  {
    name: { type: String, required: true },
    createdBy: { type: String, required: true },
    songs: { type: Array, required: false },
  },
  { timestamps: true },
);

export default mongoose.model<IPlaylist>("playlist", PlaylistSchema);
