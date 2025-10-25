import fs from 'fs';
import path from 'path';
import { type Directory, type DirectoryTree } from './types.js';
import * as Messages from './Messages.js';
class DirectoryManager {
    static async getDirectoryTree(dirPath: string): Promise<DirectoryTree> {
        await this.checkIsNotIgnoredDirectory(dirPath);
        await this.checkIsDirectoryExist(dirPath);
        return new Promise<DirectoryTree>((resolve, reject) => {
            fs.readdir(dirPath, (error, files) => {
                if (error) reject(error.message);
                const dirTree = files.map((file) => {
                    const filePath = path.join(dirPath, file);
                    const stats = fs.statSync(filePath);
                    const result: Directory = {
                        name: file,
                        isDirectory: stats.isDirectory(),
                        size: stats.size,
                        absolutePath: filePath
                    };
                    return result;
                });
                resolve(dirTree);
            });
        });
    }

    static async createDirectory(dirPath: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.checkIsDirectoryExist(dirPath)
                .then(() => {
                    reject(
                        Messages.DIRECTORY +
                            Messages.SPACE +
                            Messages.ALREADY_EXIST
                    );
                })
                .catch(() => {});
            fs.mkdir(dirPath, { recursive: true }, (error) => {
                if (error) reject(error.message);
                else resolve(true);
            });
        });
    }

    static async deleteDirectory(dirPath: string): Promise<boolean> {
        await this.checkIsDirectoryExist(dirPath);
        //TODO: have to check whether directory is empty
        return new Promise<boolean>((resolve, reject) => {
            fs.rm(dirPath, { recursive: true }, (error) => {
                if (error) reject(error.message);
                resolve(true);
            });
        });
    }

    static async checkIsDirectoryExist(dirPath: string): Promise<boolean> {
        await this.checkIsValidDirectory(dirPath);
        return new Promise((resolve, reject) => {
            fs.exists(dirPath, (exists) => {
                if (exists) resolve(true);
                else
                    reject(
                        Messages.DIRECTORY +
                            Messages.SPACE +
                            Messages.DOES_NOT_EXIST
                    );
            });
        });
    }

    static async checkIsValidDirectory(dirPath: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const parts = dirPath.split("/");
            const lastPart = parts[parts.length - 1] ?? "";
            const extName = path.extname(lastPart);
            if (extName.length > 0)
                reject(
                    Messages.INVALID +
                        Messages.SPACE +
                        Messages.DIRECTORY +
                        Messages.SPACE +
                        Messages.PATH
                );
            resolve(true);
        });
    }

    static async checkIsNotIgnoredDirectory(dirPath: string): Promise<boolean> {
        await this.checkIsValidDirectory(dirPath);
        const excludedDirs = ['node_modules', '.git', 'dist'];
        let isIgnoredDir = false;
        for (let index = 0; index < excludedDirs.length; index++) {
            const ignoredDir = excludedDirs[index] as string;
            if (dirPath.includes(ignoredDir)) {
                isIgnoredDir = true;
                break;
            }
        }
        return new Promise<boolean>((resolve, reject) => {
            if (isIgnoredDir)
                reject('Ignored' + Messages.SPACE + Messages.DIRECTORY);
            resolve(true);
        });
    }
}
export default DirectoryManager;
