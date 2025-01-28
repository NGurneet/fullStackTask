import mongoose, { Schema, Document } from "mongoose";
import { IFolder } from "./folder.dto";

export const FolderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
      default: null,
    },
    files: [{ type: Schema.Types.ObjectId, ref: "File", required: false }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model<IFolder>("folder", FolderSchema);
