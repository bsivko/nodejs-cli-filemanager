import { InputError } from "../errors.js";
import { osOperations } from "./os.js";
import { dirOperations } from "./dir.js";

class CmdProcessor {    

    async handle(args) {
        if ((args[0] === 'os') && (args.length == 2)) {
            osOperations.handle(args[1]);
            return;
        }

        const proceed = await dirOperations.handle(args);
        if (proceed)
            return;

        throw new InputError();
    }
}  
  
 const cmdProcessor = new CmdProcessor();
  
 export { cmdProcessor };