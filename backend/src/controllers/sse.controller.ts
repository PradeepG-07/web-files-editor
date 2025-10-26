import asyncHandler from '../utils/asyncHandler.js';
import { Request, Response } from 'express';
import { FileSchema } from '../utils/zodTypes.js';
import { checkAndThrowZodErrors } from '../utils/helpers.js';
import SseManager from '../services/SseManager.js';
import ApiError from '../utils/ApiError.js';
import ApiRespone from '../utils/ApiResponse.js';

export const registerToSSE = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, error } = FileSchema.pick({ path: true })
            .required({ path: true })
            .safeParse(req.body ?? req.query);
        if (error) {
            return checkAndThrowZodErrors(error);
        }
        const streamUrl = await SseManager.createSubscription(data.path);
        if (streamUrl == null)
            throw new ApiError(
                500,
                'Unable to subscribe',
                'Unable to subscribe'
            );
        res.json(new ApiRespone(200, { streamUrl }, 'Subscribed to SSE'));
    }
);

export const initialiseSSE = asyncHandler(
    async (req: Request, res: Response) => {
        const clientId = req.params.clientId;
        const connected = await SseManager.addConnection(clientId, res);
        if (!connected) {
            throw new ApiError(
                400,
                'Connection not found',
                'Could not able to initialise SSE'
            );
        }
        res.writeHead(200, {
            'content-type': 'text/event-stream',
            'cache-control': 'no-cache',
            connection: 'keep-alive',
        });
        res.flushHeaders();
        setInterval(() => {
            res.write(`event: ping\ndata: hello\n\n`);
        }, 5000);
        req.on('close', () => SseManager.closeConnection(clientId));
        req.on('error', () => SseManager.closeConnection(clientId));
        req.on('end', () => SseManager.closeConnection(clientId));
    }
);
