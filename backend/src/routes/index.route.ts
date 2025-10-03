import { Router } from 'express';
import fileRouter from './file.route.js';
import directoryRouter from './directory.route.js';

const indexRouter = Router();

indexRouter.use('/file', fileRouter);
indexRouter.use('/directory', directoryRouter);

export default indexRouter;
