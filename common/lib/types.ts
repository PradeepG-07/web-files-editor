export type Directory = {
    name: string;
    isDirectory: boolean;
    absolutePath: string;
    size: number;
};
export type DirectoryTree = Directory[];
