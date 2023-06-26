import { homedir } from "os";
import { messanger } from "./messanger.js";

const usernameArgName = 'username'

class State {
    constructor() {
        this.username = 'Incognito';

        let homeDir = homedir();
        this.currentDir = homeDir;
        this.rootDir = homeDir;
    }

    applyArgs(args) {

      for (let [key, value] of args) {
        if (key === usernameArgName)
            this.username = value;
        }
    }

    setNewDir(newDir) {
        if (newDir.length < this.rootDir) {
            messanger.printCantGoUpRoot();
            throw InputError();
        }
        else {
            this.currentDir = newDir;
        }
    }
}  
  
 const state = new State();
  
 export { state };