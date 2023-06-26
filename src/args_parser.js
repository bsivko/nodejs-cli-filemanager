// Parse cmd args by '--name=value' format.
function parseStartArgs(args) {

    const prefix = '--'
    
    let result = new Map();

    args.forEach((val) => {

        // Does it have the prefix and '='?
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

// Parse line commands.
function parseCmdArgs(text) {
    let result = text.split(' ');
    return result;
};

function consoleLogArgs(args) {
    if (args instanceof Map)
        for (let [key, value] of args) {
            console.log(key + " = " + value);
        }
    else if (args instanceof Array) {
        args.forEach(element => {
            console.log(element);
        });
    }
}

export { parseStartArgs, consoleLogArgs, parseCmdArgs }
