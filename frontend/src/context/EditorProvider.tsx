import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { FileContext } from "./FileProvider";
import TextFile from "../core/models/TextFile";
import Directory from "../core/models/Directory";
import type File from "../core/models/File";
import type { FileContent } from "../core/types";
import FileService from "../core/services/FileService";
import useApiService from "../hooks/useApiService";

type IEditor = {
  activeFile: TextFile | null
}

export type EditorContextType = {
    editor: IEditor, 
    setEditor: Dispatch<SetStateAction<IEditor>>, 
    setActiveFile: (absolutePath: string) => Promise<File>,
    setActiveFileContent: (updatedContent: FileContent) => void
}

export const EditorContext = createContext<EditorContextType>({
    editor: { activeFile: null },
    setEditor: () => {},
    setActiveFile: () => null,
    setActiveFileContent: () => {}
});
export const EditorProvider = ({children}) => {
    const fileProvider = useContext(FileContext);
    const api = useApiService();
    const [editor, setEditor] = useState<IEditor>({activeFile: null});
    
    async function setActiveFile (absolutePath: string): Promise<File>{
        if(fileProvider.isOpenedFile(absolutePath)){
            const file = fileProvider.openFiles.get(absolutePath);
            setEditor(prev => {return {...prev, activeFile: file}});
            return file;    
        }
        const object = fileProvider.allFiles.get(absolutePath);
        if(!object || object instanceof Directory){
            return null;
        }
        
        const newOpenedFileMap = new Map(fileProvider.openFiles);
        const fileData = await FileService.loadFile(object.absolutePath, api);
        object.setContent(fileData);
        newOpenedFileMap.set(absolutePath, object);
        fileProvider.setOpenedFiles(_ => newOpenedFileMap);
        setEditor(prev =>{
            return {...prev, activeFile: object};
        });
        return object;
    }

    function setActiveFileContent(updatedContent: FileContent){
        const newFile = FileService.getFileInstance(editor.activeFile);
        newFile.setContent(updatedContent);
        setEditor(prev => {
            return {
                ...prev,
                activeFile: newFile
            }
        });
    }

    useEffect(()=>{

    },[fileProvider.openFiles]);
    // todo:[pradeep]: on close of active file 
    return (
        <EditorContext.Provider value={{editor, setEditor, setActiveFile,setActiveFileContent}}>
            {children}
        </EditorContext.Provider>
    )
}