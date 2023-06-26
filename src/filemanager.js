import { createInterface } from "readline";

import { parseArgs } from "./args_parser.js";
import { state } from "./state.js";
import * as readline from 'node:readline';

// One root of start.
const start_app = () => {

    // cmd interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });

    const args = parseArgs(process.argv);

    state.applyArgs(args);

    console.log(`Welcome to the File Manager, ${state.username}!`);
};

start_app();
