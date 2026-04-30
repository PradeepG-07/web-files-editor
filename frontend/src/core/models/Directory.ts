import type { IDirectory, IObject } from "../types";

export default class Directory implements IDirectory{
    absolutePath: string;
    extension: string;
    isDirectory: boolean;
    name: string;
    size: number;
    public constructor(object: IObject){
        this.isDirectory = true;
        this.name = object.name;
        this.size = object.size;
        this.absolutePath = object.absolutePath;
        this.extension = null;
    }
}