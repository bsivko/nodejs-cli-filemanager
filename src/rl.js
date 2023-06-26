import * as readline from 'node:readline';
import { FileManagerError, operationErrorMessage } from "./errors.js";
import { messanger } from "./messanger.js";

class RL {
    constructor() {
        this.o = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "> ",
        });
    }

    updatePrompt() {
        readline.clearLine(process.stdout, 0)            
        this.o.prompt(true);
    }

    catched(err) {
        if (err instanceof FileManagerError) {
            console.log(err.message);                
        } else {
            console.log(operationErrorMessage);                
        }
        messanger.printCurrentDirectory();
        
        rl.updatePrompt();
    }
}  
  
 const rl = new RL();
  
 export { rl };