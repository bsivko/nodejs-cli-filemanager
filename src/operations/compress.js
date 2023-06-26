import { state } from "./../state.js";
import { messanger } from "./../messanger.js";
import fs from 'fs';
import path from "path";
import { OperationError } from "./../errors.js";
import { rl } from "./../rl.js";
import zlib from "zlib";

class CompressOperations {

    async handle(args) {
        if (args[0] == 'compress' && (args.length === 3)) {
            await this.compress(args[1], args[2]);
        }
        else if (args[0] == 'decompress' && (args.length === 3)) {
            await this.decompress(args[1], args[2]);
        }         
        else return false;

        return true;
    }

    async compress(filename, dir) {
        try {     
            const inFullName = path.join(state.currentDir, filename);
            const outFullName = path.join(state.currentDir, dir, filename);

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

                    const brotliOptions = {
                        flush: zlib.constants.BROTLI_OPERATION_FLUSH,
                        finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
                    }

                    const o = zlib.createBrotliCompress(brotliOptions);
                    const readStream = fs.createReadStream(inFullName);
                    const writeStream = fs.createWriteStream(outFullName);
                    readStream.pipe(o).pipe(writeStream);

                    writeStream.on("finish", () => {
                        process.stdout.write("\n");
                        messanger.printCurrentDirectory();
                    });

                    writeStream.on("error", () => {
                        rl.catched(new OperationError());
                        messanger.printCurrentDirectory();
                    });
                }) // out-path
            }); // in-path 
      
            
        } catch(err) {
            rl.catched(err);
        }
    }
    

    async decompress(filename, dir) {
        try {     
            const inFullName = path.join(state.currentDir, filename);
            const outFullName = path.join(state.currentDir, dir, filename);

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

                    const brotliOptions = {
                        flush: zlib.constants.BROTLI_OPERATION_FLUSH,
                        finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
                      }

                    const o = zlib.createBrotliDecompress(brotliOptions);
                    const readStream = fs.createReadStream(inFullName);
                    const writeStream = fs.createWriteStream(outFullName);
                    readStream.pipe(o).pipe(writeStream);

                    writeStream.on("finish", () => {
                        process.stdout.write("\n");
                        messanger.printCurrentDirectory();
                    });

                    writeStream.on("error", () => {
                        rl.catched(new OperationError());
                        messanger.printCurrentDirectory();
                    });
                }) // out-path
            }); // in-path 
      
            
        } catch(err) {
            rl.catched(err);
        }
    }    
}  
  
 const compressOperations = new CompressOperations();
  
 export { compressOperations };