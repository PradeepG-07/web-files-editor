import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { DirectorySchema } from '../utils/zodTypes.js';
import { checkAndThrowZodErrors } from '../utils/helpers.js';
import { DirectoryManager } from 'common';
import ApiRespone from '../utils/ApiResponse.js';
import { Operations } from '../utils/types.js';
import RedisPubSubService from '../services/RedisPubSubService.js';
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
        const parentDirectoryPath = await DirectoryManager.getParentDirectory(directoryPath);
        await DirectoryManager.createDirectory(directoryPath);
        await RedisPubSubService.publishToChannel(parentDirectoryPath,Operations.DIRECTORY_CREATE,directoryPath);
        
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
        const parentDirectoryPath = await DirectoryManager.getParentDirectory(directoryPath);
        await DirectoryManager.deleteDirectory(directoryPath);
        await RedisPubSubService.publishToChannel(parentDirectoryPath,Operations.DIRECTORY_DELETE,directoryPath);
        return res.json(
            new ApiRespone(
                200,
                directoryPath,
                'Directory deleted successfully.'
            )
        );
    }
);
