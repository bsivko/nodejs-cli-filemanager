
import * as readline from 'node:readline';

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
}  
  
 const rl = new RL();
  
 export { rl };