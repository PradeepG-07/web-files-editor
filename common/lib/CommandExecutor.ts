import ChildProcess from 'node:child_process';
import * as Messages from "./Messages.js"
class CommandExecutor {
    static async execute(command: string): Promise<string> {
        await this.checkIsSafeCommand(command);
        return new Promise<string>((resolve, reject) => {
            ChildProcess.exec(
                command,
                (error, stdout: string, stderr: string) => {
                    if (error !== null) {
                        reject(error.message);
                    } else {
                        resolve(stdout ?? stderr);
                    }
                }
            );
        });
    }
    static async checkIsSafeCommand(command: string): Promise<boolean> {
        const unsafeCommands = ['rm -rf / --no-preserve-root'];
        return new Promise<boolean>((resolve,reject)=>{
            if (unsafeCommands.includes(command)) {
                reject(Messages.INVALID+Messages.SPACE+Messages.COMMAND);
            }
            resolve(true);
        })
    }
}
export default CommandExecutor;
