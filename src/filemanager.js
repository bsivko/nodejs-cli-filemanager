import { parseStartArgs, parseCmdArgs, consoleLogArgs } from "./args_parser.js";
import { state } from "./state.js";
import { rl } from "./rl.js";
import { cmdProcessor } from "./operations/cmd_processor.js";
import { FileManagerError, operationErrorMessage } from "./errors.js";
import { messanger } from "./messanger.js";

// One root of start.
const start_app = () => {

    state.applyArgs(parseStartArgs(process.argv));    

    messanger.printWelcome();

    process.on("exit", () => messanger.printOnExit(state.username));

    rl.updatePrompt();

    // Loop
    rl.o.on("line", (line) => {

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

            rl.updatePrompt();
        }
        catch(err) {
            if (err instanceof FileManagerError) {
                console.log(err.message);                
            } else {
                console.log(operationErrorMessage);
                throw err;
            }
            messanger.printCurrentDirectory();

            rl.updatePrompt();
        }        
      });    
};

start_app();
