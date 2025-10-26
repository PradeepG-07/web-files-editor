import path from 'node:path';
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import DirectoryManager from './DirectoryManager.js';
import * as Messages from './Messages.js';
class FileManager {
    static async createFile(filePath: string): Promise<boolean> {
        const dirName = path.dirname(filePath);
        await DirectoryManager.checkIsValidDirectory(dirName);

        try {
            await this.checkIsFileExists(filePath);
            return new Promise<boolean>((_, reject) => {
                reject(Messages.FILE + Messages.SPACE + Messages.ALREADY_EXIST);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            return new Promise<boolean>((resolve, reject) => {
                fsPromises
                    .writeFile(filePath, '')
                    .then(() => {
                        resolve(true);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            });
        }
    }

    static async readFile(
        filePath: string,
        encoding: BufferEncoding = 'utf-8'
    ): Promise<string> {
        await this.checkIsFileExists(filePath);
        const readPromise = new Promise<string>((resolve, reject) => {
            fs.readFile(filePath, { encoding: encoding }, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
        return readPromise;
    }

    static async writeToFile(
        filePath: string,
        fileContent: string,
        encoding: BufferEncoding = 'utf-8'
    ): Promise<boolean> {
        await this.checkIsFileExists(filePath);
        const writePromise = new Promise<boolean>((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath);
            writeStream.write(fileContent, encoding, (err) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
            });
            writeStream.end(() => {
                resolve(true);
            });
        });
        return writePromise;
    }

    static async appendToFile(
        filePath: string,
        fileContent: string,
        encoding: BufferEncoding = 'utf-8'
    ): Promise<boolean> {
        await this.checkIsFileExists(filePath);
        const appendPromise = new Promise<boolean>((resolve, reject) => {
            fs.appendFile(filePath, fileContent, { encoding }, (err) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
                resolve(true);
            });
        });
        return appendPromise;
    }

    static async deleteFile(filePath: string): Promise<boolean> {
        await this.checkIsFileExists(filePath);
        const deletePromise = new Promise<boolean>((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
                resolve(true);
            });
        });
        return deletePromise;
    }

    static async checkIsValidFilePath(filePath: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const extName = path.extname(filePath);
            if (extName.length <= 0)
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

    static async checkIsFileExists(filePath: string): Promise<boolean> {
        await this.checkIsValidFilePath(filePath);
        return new Promise<boolean>((resolve, reject) => {
            fs.exists(filePath, (exists) => {
                if (exists) resolve(true);
                else
                    reject(
                        Messages.FILE + Messages.SPACE + Messages.DOES_NOT_EXIST
                    );
            });
        });
    }

    static async getParentDirectory(filePath: string): Promise<string>{
        await this.checkIsValidFilePath(filePath);
        return path.dirname(filePath);
    }
}
export default FileManager;
