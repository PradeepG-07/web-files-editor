import FileService from "../services/FileService";
import type { FileContent, FileType, IFile, IObject, Language } from "../types";

export default abstract class File implements IFile{
    name: string;
    isDirectory: boolean;
    absolutePath: string;
    size: number;
    extension: string;
    content: FileContent;
    language: Language
    fileType: FileType

    public constructor(object: IObject){
        this.name = object.name;
        this.isDirectory = object.isDirectory;
        this.absolutePath = object.absolutePath;
        this.size = object.size;
        this.extension = object.extension;
        this.fileType = FileService.getFileTypeFromExtension(this.extension);
        this.language = FileService.getLanguageFromFileType(this.fileType, this.extension);
    }
    abstract parse()
    abstract getContent()
    abstract setContent(updatedContent: FileContent)
}