import 'dotenv/config';
import express from 'express';
import indexRouter from './routes/index.route.js';
import cors from "cors";
import cleanedEnv from './utils/cleanedEnv.js';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: cleanedEnv.FRONTEND_URI
}));

app.use('/api/v1', indexRouter);

export default app;
