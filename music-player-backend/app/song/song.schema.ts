import mongoose from "mongoose";
import { type ISong } from "./song.dto";

const Schema = mongoose.Schema;

const SongSchema = new Schema<ISong>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: false },
    genre: { type: String, required: false },
    lyrics: { type: String, required: false },
    songUrl: { type: String, required: true },
    playlistId: { type: String, required: false },
    size: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ISong>("song", SongSchema);
