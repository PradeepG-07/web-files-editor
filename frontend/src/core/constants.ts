
export const ImageTypes = {
    JPG: "jpg",
    JPEG:  "jpeg",
    PNG: "png",
}

export const Languages = {
    JAVASCRIPT: "javascript",
    JAVA: "java",
    HTML: "html",
    CSS: "css",
    CPP: "cpp",
    TXT: "plaintext",
    DEFAULT_LANG: "plaintext",
    TYPESCRIPT: "typescript"
}

export const JAVASCRIPT_EXTENSION = ".js"
export const JAVA_EXTENSION = ".java"
export const HTML_EXTENSION = ".html"
export const CSS_EXTENSION = ".css"
export const CPP_EXTENSION = ".cpp"
export const TXT_EXTENSION = ".txt"
export const TYPESCRIPT_EXTENSION = ".ts"

export const ExtensionLanguageMap = {
    [JAVASCRIPT_EXTENSION] : Languages.JAVASCRIPT,
    [JAVA_EXTENSION] : Languages.JAVA,
    [HTML_EXTENSION] : Languages.HTML,
    [CSS_EXTENSION]: Languages.CSS,
    [CPP_EXTENSION] : Languages.CPP,
    [TXT_EXTENSION]: Languages.TXT,
    [TYPESCRIPT_EXTENSION]: Languages.TYPESCRIPT
}


export const FileTypes = {
    IMAGE : "image",
    VIDEO : "video",
    AUDIO : "audio",
    TEXT : "text",
}

export const FileExtensions = {
    IMAGE: [".img",".png",".jpg",".jpeg"] ,
    VIDEO: [".mp4"],
    AUDIO: [".mp3"],
    TEXT: [".txt",".java",".cpp",".js",".html",".css"]
}

export const ROUTES = {
    FILE: {
        CREATE: "/file/create",
        WRITE: "/file/write",
        DELETE: "/file/delete",
        GET: "/file",
    },
    DIRECTORY: {
        CREATE: "/directory/create",
        WRITE: "/directory/write",
        DELETE: "/directory/delete",
        GET: "/directory/treeview",
    }
}

export const INIT_DIR_PATH = "/home/pradeep/projects/node/web-files-editor/backend/src";

export const DEFAULT_FILE_PATH = "/home/pradeep/projects/node/web-files-editor/backend/src/app.ts"