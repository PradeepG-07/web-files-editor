export type Directory = {
    name: string;
    isDirectory: boolean;
    absolutePath: string;
    size: number;
    extension: string|null
};
export type DirectoryTree = Directory[];
