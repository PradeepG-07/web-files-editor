import type { IObject, TextFileContent } from "../types";
import File from "./File";
export default class TextFile extends File{
    public constructor(object: IObject){
        super(object);
    }
    public getContent(){
        return this.content;
    }
    parse() {}
    setContent(updatedContent: TextFileContent) {
        this.content = updatedContent;
    }
}