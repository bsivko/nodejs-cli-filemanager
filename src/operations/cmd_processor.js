import { InputError } from "../errors.js";
import { osOperations } from "./os.js";
import { dirOperations } from "./dir.js";
import { FileManagerError, operationErrorMessage } from "./../errors.js";
import { messanger } from "./../messanger.js";
import { rl } from "./../rl.js";

class CmdProcessor {    

    async handle(args) {
        if ((args[0] === 'os') && (args.length == 2)) {
            osOperations.handle(args[1]);
            return;
        }

        try {
            const proceed = await dirOperations.handle(args);
            if (proceed)
                return;

            throw new InputError();
        }
        catch(err) {
            if (err instanceof FileManagerError) {
                console.log(err.message);                
            } else {
                console.log(operationErrorMessage);                
            }
            messanger.printCurrentDirectory();
            
            rl.updatePrompt();
        }
    }
}  
  
 const cmdProcessor = new CmdProcessor();
  
 export { cmdProcessor };