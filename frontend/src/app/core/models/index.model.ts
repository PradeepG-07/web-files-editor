export type Item = {
    name: string;
    isDirectory: boolean;
    absolutePath: string,
    size: number;
};
export type Tree = Item[];
export type SplittedCurrentPath = {
    displayPath: string,
    absolutePath: string
}
