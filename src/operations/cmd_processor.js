import { InputError } from "../errors.js";
import { osOperations } from "./os.js";
import { dirOperations } from "./dir.js";
import { fileOperations } from "./file.js";
import { rl } from "./../rl.js";

class CmdProcessor {    

    async handle(args) {
        if ((args[0] === 'os') && (args.length == 2)) {
            osOperations.handle(args[1]);
            return;
        }

        try {
            {
                const proceed = await dirOperations.handle(args);
                if (proceed)
                    return;
            }

            {
                const proceed = await fileOperations.handle(args);
                if (proceed)
                    return;
            }            

            throw new InputError();
        }
        catch(err) {
            rl.catched(err);
        }
    }
}  
  
 const cmdProcessor = new CmdProcessor();
  
 export { cmdProcessor };