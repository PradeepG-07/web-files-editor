import { Router } from 'express';
import {
    appendToFile,
    createFile,
    deleteFile,
    getFile,
    writeToFile,
} from '../controllers/file.controller.js';

const fileRouter = Router();

fileRouter.get('/', getFile);
fileRouter.post('/create', createFile);
fileRouter.post('/write', writeToFile);
fileRouter.put('/append', appendToFile);
fileRouter.delete('/delete', deleteFile);

export default fileRouter;
