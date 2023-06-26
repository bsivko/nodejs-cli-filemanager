import { state } from "./../state.js";
import { InputError } from "./../errors.js";
import { messanger } from "./../messanger.js";
import os, { EOL } from 'os';

class OsOperations {    

    handle(action) {
        if (action == '--EOL') {
            messanger.printTextResult(JSON.stringify(EOL) + "\n");
        } 
        else if (action == '--cpus') {
            let cpu_s = os.cpus();
            let text = "CORES:" + cpu_s.length + "\n";            

            let n = 0;
            cpu_s.forEach(element => {
                n++;
                text += "cpu " + n + ":";                    
                text += element.model.toString() + "\n";
            });

            messanger.printTextResult(text + "\n");
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