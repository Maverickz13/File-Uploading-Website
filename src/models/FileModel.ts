import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  originalname: string;
  filename: string;
}

const FileSchema: Schema = new Schema({
  originalname: { type: String, required: true },
  filename: { type: String, required: true }
})

const FileModel = mongoose.model<IFile>('file-meta-data', FileSchema);

export default FileModel;
