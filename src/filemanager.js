import { parseStartArgs, parseCmdArgs, consoleLogArgs } from "./args_parser.js";
import { state } from "./state.js";
import { messanger } from "./messanger.js";
import * as readline from 'node:readline';
import { cmdProcessor } from "./operations/cmd_processor.js";
import { FileManagerError, operationErrorMessage } from "./errors.js";

// One root of start.
const start_app = () => {

    // cmd interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });

    state.applyArgs(parseStartArgs(process.argv));    

    messanger.printWelcome();

    process.on("exit", () => messanger.printOnExit(state.username));

    rl.prompt(true);

    // Loop
    rl.on("line", (line) => {

        try {
            const text = line.trim();
    
            const cmdArgs = parseCmdArgs(text);

            // consoleLogArgs(cmdArgs);

            if (cmdArgs.length === 0) {
                messanger.printErrorAtInput();
            }
            else {
                if (cmdArgs[0] == ".exit")
                    process.exit();
                
                cmdProcessor.handle(cmdArgs);
            }

        }
        catch(err) {
            if (err instanceof FileManagerError) {
                console.log(err.message);                
            } else {
                console.log(operationErrorMessage);                
            }
            messanger.printCurrentDirectory();
        }
        rl.prompt(true);
      });    
};

start_app();
