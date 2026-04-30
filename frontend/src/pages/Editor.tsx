import { useContext } from "react"
import { MonacoEditor } from "../components/MonacoEditor";
import { EditorContext, EditorProvider } from "../context/EditorProvider";
import { DEFAULT_FILE_PATH } from "../core/constants";
import { FileProvider } from "../context/FileProvider";

const Editor = () => {
  // if(!activeFile) return <>No file</>;
  
  return (
    
    <div>
       <FileProvider>
        {/* TopBar */}
        {/* SideBar */}
        {/* MonacoEditor Step-1 */}
        <EditorProvider>
          <MonacoEditor />
        </EditorProvider>
        {/* Renderer For Special Files */}
        {/* Footer */}
        </FileProvider>
    </div>
  )
}

export default Editor