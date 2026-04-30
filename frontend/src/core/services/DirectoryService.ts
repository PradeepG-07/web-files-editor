import useApiService from "../../hooks/useApiService";
import { ROUTES } from "../constants";
import type { IObject } from "../types";
import FileService from "./FileService";
import File from "../models/File";
import Directory from "../models/Directory";
export class DirectoryService{
    static async createFolder(path: string, api: ReturnType<typeof useApiService>): Promise<IObject> {
        const data = await api.put<IObject>(ROUTES.DIRECTORY.CREATE, {path});
        return data;
    }
    static async loadStructure(loadFilePath: string = "/", api: ReturnType<typeof useApiService>): Promise<(File | Directory)[]> {
        const objects = await api.get<IObject[]>(ROUTES.DIRECTORY.GET, {params: {path: loadFilePath}});
        return objects.map((object)=>{
            if(object.isDirectory){
                return this.getDirectoryInstance(object);
            }
            return FileService.getFileInstance(object);
        })
    }
    static getDirectoryInstance(object: IObject){
        return new Directory(object);
    }
}