import CommandExecutor  from "../lib/CommandExecutor.js";
import {describe, expect, it} from "@jest/globals";
import * as Messages from "../lib/Messages.js";
describe("Command Executor", ()=>{
    describe("Execute Command", ()=>{
        it("Should execute command", async ()=>{
            const command = "ls";
            const result = await CommandExecutor.execute(command);
            expect(JSON.stringify(result)).toBeDefined();
        })
        it("Should fail as the command is invalid command", async ()=>{
            const command = "invalid";
            try {
                await CommandExecutor.execute(command);
            } catch (error) {
                expect(error).toContain("not found")
            }
        })
    })

    describe("Is safe command", ()=>{
        it("Should return true", async ()=>{
            const command = "ls";
            const result = await CommandExecutor.checkIsSafeCommand(command);
            expect(result).toBeTruthy();
        })
        it("Should fail as the command is not safe", async ()=>{
            const command = "rm -rf / --no-preserve-root";
            try {
                await CommandExecutor.checkIsSafeCommand(command);
            } catch (error) {
                expect(error).toContain(Messages.INVALID+Messages.SPACE+Messages.COMMAND);
            }
        })
    })
});