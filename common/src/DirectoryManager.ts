import fs from 'fs';
import path from 'path';
import { type Directory, type DirectoryTree } from './types.js';

class DirectoryManager {
    static getDirectoryTree(dirPath: string): DirectoryTree {
        this.checkIsValidDirectory(dirPath);
        const files = fs.readdirSync(path.resolve(dirPath));
        const dirTree = files.map((file) => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            const result: Directory = {
                name: file,
                isDirectory: stats.isDirectory(),
            };
            return result;
        });
        return dirTree;
    }

    static createDirectory(dirPath: string): boolean {
        if (this.checkIsDirectoryExist(dirPath)) {
            throw new Error('Directory already exists');
        }
        const cleanedDirPath = path.dirname(dirPath);
        fs.mkdirSync(cleanedDirPath, { recursive: true });
        return true;
    }

    static deleteDirectory(dirPath: string): boolean {
        this.checkIsDirectoryExist(dirPath);
        const cleanedDirPath = path.dirname(dirPath);
        fs.rmdirSync(cleanedDirPath, { recursive: true });
        return true;
    }

    static checkIsDirectoryExist(dirPath: string) {
        const dirExist = fs.existsSync(dirPath);
        if (!dirExist) {
            throw new Error('Directory not found');
        }
        return true;
    }

    static checkIsValidDirectory(dirPath: string): boolean {
        this.checkIsDirectoryExist(dirPath);
        if (this.isIgnoredDirectory(dirPath)) {
            throw new Error('Ignored Directory');
        }
        return true;
    }

    static isIgnoredDirectory(dirPath: string): boolean {
        const excludedDirs = ['node_modules', '.git', 'dist'];
        let validDir = true;
        for (let index = 0; index < excludedDirs.length; index++) {
            const ignoredDir = excludedDirs[index] as string;
            if (dirPath.includes(ignoredDir)) {
                validDir = false;
                break;
            }
        }
        return validDir;
    }
}

export default DirectoryManager;
