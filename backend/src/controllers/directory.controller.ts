import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { DirectorySchema } from '../utils/zodTypes.js';
import { checkAndThrowZodErrors } from '../utils/helpers.js';
import { DirectoryManager } from 'common';
import ApiRespone from '../utils/ApiResponse.js';
export const getDirectoryTree = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, error } = DirectorySchema.pick({ path: true })
            .required({ path: true })
            .safeParse(req.body ?? req.query);
        if (error) {
            return checkAndThrowZodErrors(error);
        }
        const directoryPath = data.path;        
        const treeView = await DirectoryManager.getDirectoryTree(directoryPath);
        return res.json(
            new ApiRespone(
                200,
                treeView,
                'Directory Tree fetched successfully.'
            )
        );
    }
);
export const createDirectory = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, error } = DirectorySchema.pick({ path: true })
            .required({ path: true })
            .safeParse(req.body);
        if (error) {
            return checkAndThrowZodErrors(error);
        }
        const directoryPath = data.path;
        await DirectoryManager.createDirectory(directoryPath);
        return res.json(
            new ApiRespone(
                200,
                directoryPath,
                'Directory created successfully.'
            )
        );
    }
);
export const deleteDirectory = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, error } = DirectorySchema.required({
            path: true,
        }).safeParse(req.body);
        if (error) {
            return checkAndThrowZodErrors(error);
        }
        const directoryPath = data.path;
        await DirectoryManager.deleteDirectory(directoryPath);
        return res.json(
            new ApiRespone(
                200,
                directoryPath,
                'Directory deleted successfully.'
            )
        );
    }
);
