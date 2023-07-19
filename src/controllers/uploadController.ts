import { Request, Response } from 'express';
import FileModel from './../models/FileModel';

const uploadController = async (req: Request, resp: Response) => {
  if (!req.user) {
    return resp.status(403).json({ error: true, origError: 'Not Authorized' });
  }
  if (!req.file) {
    return resp.status(400).json({ error: 'File is mandatory' });
  }

  const { originalname, filename } = req.file;

  try {
    const file = new FileModel({ originalname, filename });
    await file.save();
    resp.status(200).json({ message: 'File uploaded successfully', originalname, filename });
  } catch (error) {
    resp.status(500).json({ error: 'File uploaded failed', origError: error });
  }
};

export default uploadController;
