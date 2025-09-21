import path from 'node:path';
import fs from 'node:fs';
import DirectoryManager from './DirectoryManager.js';
class FileManager {
    static createFile(filePath: string): boolean {
        const dirName = path.dirname(filePath);
        DirectoryManager.checkIsValidDirectory(dirName);

        if (this.checkIsFileExists(filePath)) {
            throw new Error('File already exist');
        }

        const writeStream = fs.createWriteStream(filePath);
        writeStream.end();

        return true;
    }

    static readFile(
        filePath: string,
        encoding: BufferEncoding = 'utf-8'
    ): Promise<Buffer> {
        this.checkIsFileExists(filePath);
        const readPromise = new Promise<Buffer>((resolve, reject) => {
            fs.readFile(filePath, { encoding: encoding }, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
                resolve(Buffer.from(data));
            });
        });
        return readPromise;
    }

    static writeToFile(
        filePath: string,
        fileContent: string,
        encoding: BufferEncoding = 'utf-8'
    ): Promise<boolean> {
        this.checkIsFileExists(filePath);
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

    static appendToFile(
        filePath: string,
        fileContent: string,
        encoding: BufferEncoding = 'utf-8'
    ): Promise<boolean> {
        this.checkIsFileExists(filePath);
        const appendPromise = new Promise<boolean>((resolve, reject) => {
            fs.writeFile(filePath, encoding, (err) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
                resolve(true);
            });
        });
        return appendPromise;
    }

    static deleteFile(filePath: string): Promise<boolean> {
        this.checkIsFileExists(filePath);
        const deletePromise = new Promise<boolean>((resolve, reject) => {
            fs.rm(filePath, (err) => {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
                resolve(true);
            });
        });
        return deletePromise;
    }

    static checkIsFileExists(filePath: string) {
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }
        return true;
    }
}
export default FileManager;
