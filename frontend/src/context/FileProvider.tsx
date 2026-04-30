import {createContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { DirectoryService } from '../core/services/DirectoryService';
import { INIT_DIR_PATH } from '../core/constants';
import useApiService from '../hooks/useApiService';
import Directory from '../core/models/Directory';
import File from '../core/models/File';

export type OpenedFiles = Map<string, File>;
export type ObjectMap = Map<string, File|Directory>;

export type FileContext = {
    allFiles: Map<string, File|Directory>,
    openFiles: Map<string, File>,
    isOpenedFile: (absolutePath: string) => boolean,
    setOpenedFiles: Dispatch<SetStateAction<OpenedFiles>>
}

export const FileContext = createContext<FileContext>({
    allFiles: new Map<string, File|Directory>(),
    openFiles: new Map<string, File>(),
    isOpenedFile: () => false,
    setOpenedFiles: () => {}
});

export const FileProvider = ({children}) => {
    const [objectMap, setObjectMap] = useState(new Map<string, File|Directory>());
    const [openedFilesMap, setOpenedFilesMap] = useState(new Map<string, File>());
    
    const apiService = useApiService();

    const params = new URLSearchParams(window.location.search);
    const loadPath = params.get('path') ?? INIT_DIR_PATH;

    // Methods

    function isOpenedFile(absolutePath: string){
        return openedFilesMap.has(absolutePath);
    }

    async function loadFilesAndDirectories(){
        const objects = await DirectoryService.loadStructure(loadPath,apiService);
        setObjectMap(prev => {
            const newFileMap = new Map<string, File|Directory>(prev);
            for (const object of objects) {
                newFileMap.set(object.absolutePath, object);
            }
            return newFileMap;
        });
    }

    // Hooks
    useEffect(()=>{
        loadFilesAndDirectories();
        // return () => {
        //     setObjectMap(new Map<string, File>());
        // }
    },[loadPath]);
    return (
        <FileContext.Provider value={{allFiles: objectMap, openFiles: openedFilesMap, isOpenedFile, setOpenedFiles: setOpenedFilesMap }}>
            {children}
        </FileContext.Provider>
    )
}
