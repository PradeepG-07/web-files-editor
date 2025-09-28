import DirectoryManager from '../lib/DirectoryManager.js';
import * as Messages from '../lib/Messages.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
describe('DirectoryManager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const DIRECTORY =
        '/home/pradeep.g/Projects/web-files-editor/common/test-space/';
    describe('Is not ignored directory', () => {
        it('Should return true', async () => {
            const validPath = '/home/pradeep.g/temp';
            const result =
                await DirectoryManager.checkIsNotIgnoredDirectory(validPath);
            expect(result).toBe(true);
        });
        it('Should throw Invalid Directory', async () => {
            const invalidPath = '/data/temp.txt';
            try {
                await DirectoryManager.checkIsValidDirectory(invalidPath);
            } catch (e) {
                expect(e).toBe(
                    Messages.INVALID +
                        Messages.SPACE +
                        Messages.DIRECTORY +
                        Messages.SPACE +
                        Messages.PATH
                );
            }
        });
    });
    describe('Is Valid Directory', () => {
        it('Should return true', async () => {
            const validPath = '/home/pradeep.g/temp';
            const result =
                await DirectoryManager.checkIsValidDirectory(validPath);
            expect(result).toBe(true);
        });
        it('Should throw Invalid Directory', async () => {
            const invalidPath = '/data/temp.txt';
            try {
                await DirectoryManager.checkIsValidDirectory(invalidPath);
            } catch (e) {
                expect(e).toBe(
                    Messages.INVALID +
                        Messages.SPACE +
                        Messages.DIRECTORY +
                        Messages.SPACE +
                        Messages.PATH
                );
            }
        });
    });
    describe('Directory Exists', () => {
        it('Should return true', async () => {
            const result =
                await DirectoryManager.checkIsDirectoryExist(DIRECTORY);
            expect(result).toBe(true);
        });
        it('Should throw Directory does not exit', async () => {
            const mockFilePath = '/tmp/random';
            try {
                await DirectoryManager.checkIsDirectoryExist(mockFilePath);
            } catch (errorMsg) {
                expect(errorMsg).toBe(
                    Messages.DIRECTORY +
                        Messages.SPACE +
                        Messages.DOES_NOT_EXIST
                );
            }
        });
    });
    describe('Create Directory', () => {
        it('Should create a Directory', async () => {
            const dirPath = DIRECTORY + 'new-dir';
            jest.spyOn(
                DirectoryManager,
                'checkIsDirectoryExist'
            ).mockRejectedValueOnce('');
            const result = await DirectoryManager.createDirectory(dirPath);
            expect(result).toBe(true);
        });

        it('Should fail to create file as file already exists', async () => {
            try {
                jest.spyOn(
                    DirectoryManager,
                    'checkIsDirectoryExist'
                ).mockResolvedValueOnce(true);
                await DirectoryManager.createDirectory(DIRECTORY);
            } catch (errorMsg) {
                expect(errorMsg).toBe(
                    Messages.DIRECTORY + Messages.SPACE + Messages.ALREADY_EXIST
                );
            }
        });
    });

    describe('Delete Directory', () => {
        const DELETE_DIR = DIRECTORY + 'new-dir';
        it('Should delete a Directory', async () => {
            jest.spyOn(
                DirectoryManager,
                'checkIsDirectoryExist'
            ).mockResolvedValueOnce(true);
            const result = await DirectoryManager.deleteDirectory(DELETE_DIR);
            expect(result).toBe(true);
        });

        it('Should fail to delete directory as it does not exist', async () => {
            try {
                jest.spyOn(
                    DirectoryManager,
                    'checkIsDirectoryExist'
                ).mockRejectedValue(
                    Messages.DIRECTORY +
                        Messages.SPACE +
                        Messages.DOES_NOT_EXIST
                );
                await DirectoryManager.deleteDirectory(DELETE_DIR);
            } catch (errorMsg) {
                expect(errorMsg).toBe(
                    Messages.DIRECTORY +
                        Messages.SPACE +
                        Messages.DOES_NOT_EXIST
                );
            }
        });
    });
});
