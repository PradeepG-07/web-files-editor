import { ExtensionLanguageMap, FileExtensions, FileTypes, Languages, ROUTES } from "../constants";
import File from "../models/File";
import TextFile from "../models/TextFile";
import type { FileContent, FileType, IObject } from "../types";
import BinaryFile from "../models/BinaryFile";
import useApiService from "../../hooks/useApiService";

export default class FileService{
    static getFileTypeFromExtension(fileExtension: string): FileType{
        if(FileExtensions.IMAGE.includes(fileExtension)){
            return FileTypes.IMAGE;
        }else if(FileExtensions.VIDEO.includes(fileExtension)){
            return FileTypes.VIDEO;
        }else if(FileExtensions.AUDIO.includes(fileExtension)){
            return FileTypes.AUDIO
        }else{
            return FileTypes.TEXT;
        }
    }
    static getLanguageFromFileType(fileType:FileType, fileExtension: string){
        if(fileType != FileTypes.TEXT) return null;
        if(Object.hasOwn(ExtensionLanguageMap, fileExtension)){
            return ExtensionLanguageMap[fileExtension];
        }
        return Languages.DEFAULT_LANG;
    }
    static async createFile(path: string, api: ReturnType<typeof useApiService>): Promise<File> {
        const data = await api.put<IObject>(ROUTES.FILE.CREATE, {path});
        const newFile = this.getFileInstance(data);
        return newFile;
    }
    static async loadFile(loadFilePath: string = "/", api: ReturnType<typeof useApiService>){
        const data = await api.get<FileContent>(ROUTES.FILE.GET, {params: {path: loadFilePath}});
        return data;
    }
    static getFileInstance(object: IObject): File{
        const fileType = FileService.getFileTypeFromExtension(object.extension);
        if(fileType == FileTypes.TEXT){
            return new TextFile(object);
        }
        return new BinaryFile(object);
    }
}