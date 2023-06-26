import { state } from "./../state.js";
import { messanger } from "./../messanger.js";
import fs from 'fs';
import path, { isAbsolute } from "path";
import { OperationError } from "./../errors.js";
import { rl } from "./../rl.js";
import crypto from "crypto";

class FileOperations {    

    async handle(args) {
        if (args[0] == 'cat' && (args.length === 2)) {
            await this.cat(args[1]);
        }
        else if (args[0] == 'add' && (args.length === 2)) {
            await this.add(args[1]);
        } 
        else if (args[0] == 'rn' && (args.length === 3)) {
            await this.rn(args[1], args[2]);
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
        else if (args[0] == 'hash' && (args.length === 2)) {
            await this.hash(args[1]);
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
        try {     
            const oldFullName = path.join(state.currentDir, oldname);
            const newFullName = path.join(state.currentDir, newname);
     
            fs.access(oldFullName, fs.F_OK, (err) => {                
                if (err) {
                    rl.catched(new OperationError());
                    return;
                }

                fs.access(newFullName, fs.F_OK, (err) => {                
                    if (!err) {
                        rl.catched(new OperationError());
                        return;
                    }

                    fs.rename(oldFullName, newFullName, (err) => {
                        if (err) {
                            rl.catched(new OperationError());
                            return;
                        } 
        
                        // File renamed.

                        messanger.printCurrentDirectory();
                    }); 
                    
                });
            });
          } catch(err) {
            rl.catched(err);
          }
    }

    async cp(file, dir) {

        try {     
            const dirContext = isAbsolute(dir)
                ? dir
                : path.join(state.currentDir, dir);

            const inFullName = path.join(state.currentDir, file);
            const outFullName = path.join(dirContext, file);

            // Check in-path presence.
            fs.access(inFullName, err => {
                if (err) {
                    rl.catched(new OperationError());
                    return;
                }

                // in-path found.
                // Check out-path ansence.
                fs.access(outFullName, err => {
                    if (!err) {
                        rl.catched(new OperationError());
                        return;
                    }

                    const readStream = fs.createReadStream(inFullName, "utf-8");
                    const writeStream = fs.createWriteStream(outFullName);
                    readStream.pipe(writeStream);
            
                    readStream.on("end", () => {
                        process.stdout.write("\n");
                        messanger.printCurrentDirectory();
                    });
                    
                }) // out-path
            }); // in-path    
        } catch(err) {
            rl.catched(err);
        }    
    }

    async mv(file, dir) {
        try {
            const dirContext = isAbsolute(dir)
                ? dir
                : path.join(state.currentDir, dir);

            const inFullName = path.join(state.currentDir, file);
            const outFullName = path.join(dirContext, file);

            // Check in-path presence.
            fs.access(inFullName, err => {
                if (err) {
                    rl.catched(new OperationError());
                    return;
                }

                // in-path found.
                // Check out-path ansence.
                fs.access(outFullName, err => {
                    if (!err) {
                        rl.catched(new OperationError());
                        return;
                    }

                    const readStream = fs.createReadStream(inFullName, "utf-8");
                    const writeStream = fs.createWriteStream(outFullName);
                    readStream.pipe(writeStream);
            
                    readStream.on("end", () => {
                        process.stdout.write("\n");

                        fs.unlink(inFullName, (err) => {
                            if (err) {
                                rl.catched(new OperationError());
                                return;
                            } 
        
                            // File deleted.
        
                            messanger.printCurrentDirectory();
                        });
                    });
                    
                }) // out-path
            }); // in-path    
        } catch(err) {
            rl.catched(err);
        }    
    }    
    
    async rm(filename) {

        try {     
            const fullName = path.join(state.currentDir, filename);


            // check file presence
            fs.access(fullName, fs.F_OK, (err) => {
                if (err) {
                    rl.catched(new OperationError());
                    return;
                }      
            
                // Let's delete it.

                fs.unlink(fullName, (err) => {
                    if (err) {
                        rl.catched(new OperationError());
                        return;
                    } 

                    // File deleted.

                    messanger.printCurrentDirectory();
                });
            });

        } catch(err) {
            rl.catched(err);
        }    
    }

    async hash(filename) {
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

                    const stream = fs.createReadStream(fullname,  "utf-8");
                    const hash = crypto.createHash('sha256').setEncoding('hex');
                    stream.pipe(hash).pipe(process.stdout);

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
}  
  
 const fileOperations = new FileOperations();
  
 export { fileOperations };