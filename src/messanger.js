import { state } from "./state.js";

class Messanger {    

    printWelcome() {
        process.stdout.write(
            `Welcome to the File Manager, ${state.username}!\n`
        );
    }

    printOnExit() {
        process.stdout.write(
          `\nThank you for using File Manager, ${state.username}, goodbye!\n`
        );
    }
}  
  
 const messanger = new Messanger();
  
 export { messanger };