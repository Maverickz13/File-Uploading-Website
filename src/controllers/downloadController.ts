import { Request, Response } from 'express';
import FileModel from './../models/FileModel';

const downloadController = async (req: Request, resp: Response) => {
  if (!req.user) {
    return resp.status(403).json({ error: true, origError: 'Not Authorized' });
  }
  const { filename } = req.params;
  if (!filename) {
    return resp.status(400).json({ error: 'Filename is mandatory' });
  }

  try {
    const fileRec = await FileModel.findOne({ filename });
    if (!fileRec) {
      return resp.status(404).json({ error: 'File not uploaded earlier' });
    }

    resp.attachment(fileRec.originalname);
    resp.sendFile(filename, { root: 'uploads' }, (error) => {
      if (error) {
        return resp.status(500).json({ error: 'Error downloading file', origError: error });
      }
    });
  } catch (error) {
    return resp.status(500).json({ error: 'Internal Server Error', origError: error });
  }
};

export default downloadController;