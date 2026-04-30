import * as Constants from "./constants"; 

export type ImageType = typeof Constants.ImageTypes[keyof typeof Constants.ImageTypes];
export type FileType = typeof Constants.FileTypes[keyof typeof Constants.FileTypes];
export type Language = typeof Constants.Languages[keyof typeof Constants.Languages];
export type File = IFile;
export type Folder = IDirectory;
export type TextFileContent = string;
export type BinaryFileContent = BinaryType;
export type FileContent = TextFileContent | BinaryFileContent;

export interface IMonacoEditorProps{
  language: Language,
  handleCodeChange: Function,
  code: string
}

export interface IObject{
  name: string,
  size: number,
  absolutePath: string
  isDirectory: boolean
  extension: string
}

export interface IFile extends IObject{
  // Required properties and methods for the file class will be added here
  content: FileContent
}

export interface IDirectory extends IObject{
  // Required properties and methods for the folder class will be added here
}