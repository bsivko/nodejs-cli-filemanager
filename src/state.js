const usernameArgName = 'username'

class State {
    applyArgs(args) {
      this.username = 'Incognito';

      for (let [key, value] of args) {
        if (key === usernameArgName)
            this.username = value;
        }
    }
}  
  
 const state = new State();
  
 export { state };