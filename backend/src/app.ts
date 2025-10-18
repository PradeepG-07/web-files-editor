import express from 'express';
import indexRouter from './routes/index.route.js';
import "dotenv/config";

const app = express();

app.use(express.json());

app.use('/api/v1', indexRouter);

export default app;
