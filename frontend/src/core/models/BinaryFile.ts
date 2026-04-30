import type { BinaryFileContent, IObject } from "../types";
import File from "./File";
export default class BinaryFile extends File{
    isParsed: boolean = false;
    public constructor(object: IObject){
        super(object);
    }
    public getContent(){
        if(this.isParsed) return this.content;
        return this.parse();
    }
    parse(){
        // todo:[pradeep]: parse the content according to file type
        return this.content;
    }
    setContent(updateContent: BinaryFileContent){
        this.content = updateContent;
        const parsedContent = this.parse();
        this.content = parsedContent;
        return this.content;
    }
}