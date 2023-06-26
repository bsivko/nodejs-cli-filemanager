import { createInterface } from "readline";

import { parseArgs } from "./args_parser.js";
import { state } from "./state.js";
import { messanger } from "./messanger.js";
import * as readline from 'node:readline';

// One root of start.
const start_app = () => {

    // cmd interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });

    state.applyArgs(parseArgs(process.argv));    

    messanger.printWelcome();

    process.on("exit", () => messanger.printOnExit(state.username));

    rl.prompt(true);

    // Loop
    rl.on("line", (line) => {
        const value = line.trim();
  
        if (value.includes(".exit")) {
          process.exit();
        }

        this.rl.prompt(true);
      });    
};

start_app();
