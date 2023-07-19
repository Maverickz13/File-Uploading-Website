import express, { Router } from 'express';
import fetchController from "./../controllers/fetchController";

const fetchRouter: Router = express.Router();

/**
 * @swagger
 * /files:
 *   get:
 *     summary: API to fetch the list of files
 *     responses:
 *       '200':
 *         description: List of File
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
fetchRouter.get('/', fetchController);

export default fetchRouter;