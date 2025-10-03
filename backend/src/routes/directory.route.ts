import { Router } from 'express';
import {
    getDirectoryTree,
    createDirectory,
    deleteDirectory,
} from '../controllers/directory.controller.js';

const directoryRouter = Router();

directoryRouter.get('/treeview', getDirectoryTree);
directoryRouter.post('/create', createDirectory);
directoryRouter.delete('/delete', deleteDirectory);

export default directoryRouter;
