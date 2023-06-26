import { state } from "./../state.js";
import { messanger } from "./../messanger.js";
import fs from 'fs';
import { isAbsolute } from "path";
import path from "path";
import { OperationError } from "../errors.js";

class DirOperations {    

    async handle(args) {
        if (args[0] == 'up' && (args.length === 1)) {
            await this.up();
        } 
        else if (args[0] == 'cd' && (args.length === 2)) {
            await this.cd(args[1]);
        }  
        else if (args[0] == 'ls' && (args.length === 1)) {
            await this.ls();
        } else 
            return false;

        return true;
    }

    async up() {
        const newDir = path.join(state.currentDir, "..", path.sep);
        state.setNewDir(newDir);
        messanger.printCurrentDirectory();
    }

    async ls() {
        // const files = await fs.readdir(state.currentDir, { withFileTypes: true });

        fs.readdir(state.currentDir, { withFileTypes: true }, (err, files) => {
            if (err) {
                // Smth scary happened.
                {
                    rl.catched(new OperationError());
                    return;
                }
            } 

            const result = files.sort().map((file) => {
                return { Name: file.name, IsFile: file.isFile()};
              });
    
            // Sort by folder/file and name.
            const sorted = result.sort(function(a, b) {
                if (a.IsFile && !b.IsFile)
                    return 1;
    
                if (!a.IsFile && b.IsFile)
                    return -1;
                
                if (a.Name < b.Name)
                    return -1;
    
                if (a.Name > b.Name)
                    return 1;
    
                return 0;
              });
    
            messanger.printLS(sorted);

          });
    }

    async cd(dir) {
        const newDir = isAbsolute(dir)
            ? path.join(dir, path.sep)
            : path.join(state.currentDir, dir, path.sep);

        // Check for directory.
        await fs.stat(newDir, (err, stats) => {
            if (err) {
                rl.catched(new OperationError());
                return;
            }             

            if (!stats.isDirectory()) {
                rl.catched(new OperationError());
                return;
            }        
    
            state.setNewDir(newDir);
            messanger.printCurrentDirectory();
        }); 
    }
}  
  
 const dirOperations = new DirOperations();
  
 export { dirOperations };