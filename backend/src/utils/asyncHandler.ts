import { NextFunction, Request, Response } from 'express';
import ApiError from './ApiError.js';
export default function asyncHandler<T>(
    asyncFunc: (req: Request, res: Response, next: NextFunction) => Promise<T>
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await asyncFunc(req, res, next);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.json(error);
            } else if (typeof error === 'string') {
                return res.json(new ApiError(400, null, error));
            } else {
                next(error);
            }
        }
    };
}
