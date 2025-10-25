import { Router } from 'express';
import fileRouter from './file.route.js';
import directoryRouter from './directory.route.js';
import sseRouter from './sse.route.js';

const indexRouter = Router();

indexRouter.use('/file', fileRouter);
indexRouter.use('/directory', directoryRouter);
indexRouter.use('/sse', sseRouter);

export default indexRouter;
