const fs = require("fs");
const core = require("@actions/core");

let getColour = () =>{
    let issueTitle = core.getInput('title');
    let titleSplit = issueTitle.split("|");
    return titleSplit[1]
}

let text = fs.readFileSync("./test.txt", "utf8");
text+=getColour(); 
fs.writeFileSync("./test.txt", text + "\n" + "this is new text");
