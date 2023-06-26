import { state } from "./../state.js";
import { InputError } from "./../errors.js";
import { messanger } from "./../messanger.js";
import { cpus, EOL } from 'os';

class OsOperations {    

    handle(action) {
        if (action == '--EOL') {
            messanger.printTextResult(JSON.stringify(EOL) + "\n");
        } 
        else if (action == '--cpus') {
            messanger.printTextResult(cpus().length + "\n");
        }  
        else if (action == '--homedir') {
            messanger.printTextResult(state.rootDir + "\n");
        }  
        else if (action == '--username') {
            messanger.printTextResult(state.username + "\n");
        }  
        else if (action == '--architecture') {
            messanger.printTextResult(process.arch + "\n");
        } else {
            throw new InputError();
        }
    }
}  
  
 const osOperations = new OsOperations();
  
 export { osOperations };