import { Request, Response } from 'express';
import FileModel from './../models/FileModel';

const fetchController = async (req: Request, resp: Response) => {
  if (!req.user) {
    return resp.status(403).json({ error: true, origError: 'Not Authorized' });
  }
  try {
    const files = await FileModel.find();
    resp.status(200).json({ files });
  } catch (error) {
    resp.status(500).json({ error: "Failed to fetch Files from DB", origError: error })
  }
};

export default fetchController;