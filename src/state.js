const usernameArgName = 'username'

class State {
    constructor() {
        this.username = 'Incognito';
        this.currentDir = '';  
    }

    applyArgs(args) {

      for (let [key, value] of args) {
        if (key === usernameArgName)
            this.username = value;
        }
    }
}  
  
 const state = new State();
  
 export { state };