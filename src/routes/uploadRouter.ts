import express, { Router } from 'express';
import multer from 'multer';
import uploadController from "./../controllers/uploadController";

const uploadRouter: Router = express.Router();

const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: API to upload a file
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
uploadRouter.post('/', upload.single('file'), uploadController);

export default uploadRouter;
