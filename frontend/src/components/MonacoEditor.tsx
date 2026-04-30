import Editor from '@monaco-editor/react';
import { EditorContext } from '../context/EditorProvider';
import { useContext, useEffect } from 'react';
import { DEFAULT_FILE_PATH } from '../core/constants';
import { FileContext } from '../context/FileProvider';

export const MonacoEditor = () => {
  const editorData = useContext(EditorContext);
  const fileData = useContext(FileContext)

  const editor = editorData.editor;
  useEffect(()=>{
    if(editor.activeFile?.absolutePath == DEFAULT_FILE_PATH) return ;
      editorData.setActiveFile(DEFAULT_FILE_PATH);
      // console.log(fileData);
      
  },[fileData.allFiles.size, editor.activeFile])

  // console.log("From monaco editor");
  
  console.log(editor);
  if(!editor.activeFile){
    return <>No File selected</>;
  }
  return (
    <Editor 
        options={{
          mouseWheelZoom: true,
        }}
        key={editor.activeFile.language}
        theme="vs-dark"
        height="90vh" 
        defaultLanguage={editor.activeFile.language} 
        defaultValue={editor.activeFile.getContent() ?? ""}
    />
  )
}
