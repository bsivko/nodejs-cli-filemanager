// Parse cmd args by '--name=value' format.
function parseArgs(args) {

    const prefix = '--'
    
    let result = new Map();

    args.forEach((val) => {

        // Does it has the prefix and '='?
        if (val.startsWith(prefix) && val.includes('=')) {
            // Yes, prefix is detected
            const vals = val.split("=");
            if (vals.length === 2) {
                result.set(vals[0].substring(prefix.length), vals[1]);
            }
        }
    });  
    
    return result;
};

function consoleLogArgs(args) {
    for (let [key, value] of args) {
        console.log(key + " = " + value);
    }
}

export { parseArgs, consoleLogArgs }
