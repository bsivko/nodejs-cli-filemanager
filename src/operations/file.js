import { state } from "./../state.js";
import { messanger } from "./../messanger.js";
import fs from 'fs';
import path from "path";
import { OperationError } from "./../errors.js";
import { rl } from "./../rl.js";

class FileOperations {    

    async handle(args) {
        if (args[0] == 'cat' && (args.length === 2)) {
            await this.cat(args[1]);
        }
        else if (args[0] == 'add' && (args.length === 2)) {
            await this.add(args[1]);
        } 
        else if (args[0] == 'rn' && (args.length === 3)) {
            await this.add(args[1], args[2]);
        } 
        else if (args[0] == 'cp' && (args.length === 3)) {
            await this.cp(args[1], args[2]);
        } 
        else if (args[0] == 'mv' && (args.length === 3)) {
            await this.mv(args[1], args[2]);
        } 
        else if (args[0] == 'rm' && (args.length === 2)) {
            await this.rm(args[1]);
        } 
        else return false;

        return true;
    }

    async cat(filename) {
        try {     
            const fullname = path.join(state.currentDir, filename);
      
            // Check for directory.
            await fs.stat(fullname, (err, stats) => {
                try {

                    if (err) {
                        rl.catched(new OperationError());
                        return;
                    }             

                    if (stats.isDirectory()) {
                        rl.catched(new OperationError());
                        return;
                    }
                    
                    const stream = fs.createReadStream(fullname, "utf8");

                    stream.on("data", function(chunk){ 
                        process.stdout.write(chunk);
                    });

                    stream.on("end", () => {
                        process.stdout.write("\n");
                        messanger.printCurrentDirectory();
                    });

                } catch {
                    rl.catched(new OperationError());
                }
            }); 
          } catch(err) {
            rl.catched(err);
          }
    }

    async add(filename) {
        try {     
            const fullname = path.join(state.currentDir, filename);
      
            fs.access(fullname, fs.F_OK, (err) => {                
                if (!err) {
                    rl.catched(new OperationError());
                    return;
                }   
       
                fs.open(fullname, "wx", function (err, fd) {
                    if (err)
                    {
                        rl.catched(new OperationError());
                        return;
                    }

                    fs.close(fd, function (err) {
                        if (err)
                        {
                            rl.catched(new OperationError());
                            return;
                        }
                    });
                });

                messanger.printCurrentDirectory();
            });
          } catch(err) {
            rl.catched(err);
          }
    }

    async rn(oldname, newname) {
        
    }

    async cp(fromname, toname) {
        
    }

    async mv(file, dir) {
        
    }    
    
    async rm(filename) {
        
    }
}  
  
 const fileOperations = new FileOperations();
  
 export { fileOperations };