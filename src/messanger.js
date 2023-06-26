import { state } from "./state.js";

class Messanger {    

    printWelcome() {
        process.stdout.write(`Welcome to the File Manager, ${state.username}!\n`);
    }

    printCantGoUpRoot() {
        process.stdout.write(`You can't go up out of the start directory\n`);
        this.printCurrentDirectory();
    }

    printErrorAtInput() {
        process.stdout.write(`Invalid input\n`);
        this.printCurrentDirectory();
    }

    printOnExit() {
        process.stdout.write(`\nThank you for using File Manager, ${state.username}, goodbye!\n`);
    }

    printCurrentDirectory() {
        process.stdout.write(`You are currently in ${state.currentDir}\n`);
    }

    printTextResult(text) {
        process.stdout.write(text);
        this.printCurrentDirectory();
    }
}  
  
 const messanger = new Messanger();
  
 export { messanger };