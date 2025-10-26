import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { FileSchema } from '../utils/zodTypes.js';
import { checkAndThrowZodErrors } from '../utils/helpers.js';
import { FileManager } from 'common';
import ApiRespone from '../utils/ApiResponse.js';
import RedisPubSubService from '../services/RedisPubSubService.js';
import { Operations } from '../utils/types.js';
export const getFile = asyncHandler(async (req: Request, res: Response) => {
    const { data, error } = FileSchema.pick({ path: true })
        .required({ path: true })
        .safeParse(req.body ?? req.query);
    if (error) {
        return checkAndThrowZodErrors(error);
    }
    const filePath = data.path;
    const fileContent = await FileManager.readFile(filePath);
    return res.json(
        new ApiRespone(200, fileContent, 'File fetched successfully.')
    );
});
export const createFile = asyncHandler(async (req: Request, res: Response) => {
    const { data, error } = FileSchema.pick({ path: true })
        .required({ path: true })
        .safeParse(req.body);
    if (error) {
        return checkAndThrowZodErrors(error);
    }
    const filePath = data.path;
    const directoryPath = await FileManager.getParentDirectory(filePath);
    await FileManager.createFile(filePath);
    await RedisPubSubService.publishToChannel(directoryPath,Operations.FILE_CREATE,filePath);
    return res.json(
        new ApiRespone(200, filePath, 'File created successfully.')
    );
});
export const writeToFile = asyncHandler(async (req: Request, res: Response) => {
    const { data, error } = FileSchema.required({
        path: true,
        content: true,
    }).safeParse(req.body);
    if (error) {
        return checkAndThrowZodErrors(error);
    }
    const filePath = data.path;
    const fileContent = data.content;
    await FileManager.writeToFile(filePath, fileContent);
    await RedisPubSubService.publishToChannel(filePath,Operations.FILE_EDIT,filePath);
    return res.json(
        new ApiRespone(200, fileContent, 'Written to file successfully.')
    );
});
export const appendToFile = asyncHandler(
    async (req: Request, res: Response) => {
        const { data, error } = FileSchema.required({
            path: true,
            content: true,
        }).safeParse(req.body);
        if (error) {
            return checkAndThrowZodErrors(error);
        }
        const filePath = data.path;
        const fileContent = data.content;
        await FileManager.appendToFile(filePath, fileContent);
        await RedisPubSubService.publishToChannel(filePath,Operations.FILE_EDIT,filePath);
        return res.json(
            new ApiRespone(200, fileContent, 'Appended to file successfully.')
        );
    }
);
export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
    const { data, error } = FileSchema.pick({ path: true })
        .required({ path: true })
        .safeParse(req.body);
    if (error) {
        return checkAndThrowZodErrors(error);
    }
    const filePath = data.path;
    const directoryPath = await FileManager.getParentDirectory(filePath);
    await FileManager.deleteFile(filePath);
    await RedisPubSubService.publishToChannel(filePath,Operations.FILE_DELETE,filePath);
    await RedisPubSubService.publishToChannel(directoryPath,Operations.FILE_DELETE,filePath);
    return res.json(
        new ApiRespone(200, filePath, 'Deleted file successfully.')
    );
});
