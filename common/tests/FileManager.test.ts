import FileManager from '../lib/FileManager.js';
import * as Messages from "../lib/Messages.js";
import { jest, describe, it, expect, beforeEach, afterAll, beforeAll } from '@jest/globals';
describe('FileManager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const FOLDER_PATH = "/home/pradeep.g/Projects/web-files-editor/common/test-space/";
    describe("File Exists",()=>{
        it("Should return true",async ()=>{
            const existingFilePath = FOLDER_PATH+"test.txt";
            const result = await FileManager.checkIsFileExists(existingFilePath);
            expect(result).toBe(true);
        });
        it("Should throw File does not exit",async ()=>{
            const mockFilePath = '/tmp/testfile.txt';
            try {
                await FileManager.checkIsFileExists(mockFilePath);
            } catch (errorMsg) {
                expect(errorMsg).toBe(Messages.FILE+Messages.SPACE+Messages.DOES_NOT_EXIST);
            }
        });
    })
    describe('Create File', () => {
        const filePath = FOLDER_PATH+"testcreate.txt";
        afterAll(async ()=>{
            await FileManager.deleteFile(filePath);
        })
        it('Should create a file', async() => {
            const result = await FileManager.createFile(filePath);
            expect(result).toBe(true);
        });

        it('Should fail to create file as file already exists', async() => {
            const existingFilePath = FOLDER_PATH+"test.txt";
            try {
                await FileManager.createFile(existingFilePath);
            } catch (errorMsg) {
                expect(errorMsg).toBe(Messages.FILE+Messages.SPACE+Messages.ALREADY_EXIST);
            }
        });
    });
    describe("Read file", ()=>{
        const readFilePath = FOLDER_PATH+"readfile.txt";
        it("Should read the file",async ()=>{
            const fileContent = await FileManager.readFile(readFilePath);
            expect(fileContent).toBe("hello world");
        })
        it("Should fail as there is no file", async ()=>{
            try {
                await FileManager.readFile(FOLDER_PATH+"nofile.txt");
            } catch (error) {
                expect(error).toBe(Messages.FILE+Messages.SPACE+Messages.DOES_NOT_EXIST);
            }
        })
    });
    describe("Write To File",()=>{
        const filePath = FOLDER_PATH+"testcreate.txt";
        beforeAll(async()=>{
            await FileManager.createFile(filePath);
        });
        afterAll(async ()=>{
            await FileManager.deleteFile(filePath);
        })
        it("Should write Hello world to the file", async()=>{
            const result = await FileManager.writeToFile(filePath,"Hello world");
            expect(result).toBe(true);
        });
        it("Should fail to write to a file", async ()=>{
            const invalidFilePath = FOLDER_PATH+"invalidfile.txt";
            try {
                await FileManager.writeToFile(invalidFilePath, "Hello world");
            } catch (error) {
                expect(error).toBe(Messages.FILE+Messages.SPACE+Messages.DOES_NOT_EXIST);    
            }
        });
    });
    
});
