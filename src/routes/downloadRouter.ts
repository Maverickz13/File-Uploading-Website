import express, { Router } from 'express';
import downloadController from "./../controllers/downloadController";

const downloadRouter: Router = express.Router();

/**
 * @swagger
 * /download/{filename}:
 *   get:
 *     summary: API to download a file
 *     parameters:
 *       - in: path
 *         name: filename
 *         type: string
 *         required: true
 *         description: Name of the file to download
 *     responses:
 *       '200':
 *         description: File downloaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
downloadRouter.get('/:filename', downloadController);

export default downloadRouter;