import { InputError } from "../errors.js";
import { osOperations } from "./os.js";

class CmdProcessor {    

    handle(args) {
        if ((args[0] === 'os') && (args.length == 2)) {
            osOperations.handle(args[1]);
        } else 
            throw new InputError();
    }
}  
  
 const cmdProcessor = new CmdProcessor();
  
 export { cmdProcessor };