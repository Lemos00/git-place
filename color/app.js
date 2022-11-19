const fs = require("fs");
const core = require("@actions/core");


let getColour = () =>{
    let issueTitle = core.getInput('title');
    let titleSplit = issueTitle.split("|");
    return titleSplit[1]
}

// get name of each emoji based on input color
let interpretColor = (colorArray) => {
    const upperCaseColor = colorArray[1].toUpperCase();
    switch(upperCaseColor) {
        case "RED":
            return ":red_square:";
        case "ORANGE":
            return ":orange_square:";
        case "YELLOW":
            return ":yellow_square:";
        case "GREEN":
            return ":green_square:";
        case "BLUE":
            return ":blue_square:";
        case "PURPLE":
            return ":purple_square:";
        case "BROWN":
            return ":brown_square:";
        case "BLACK":
            return ":black_large_square:";
        case "WHITE":
            return ":white_large_square:";
    }
}

let text = fs.readFileSync("./test.txt", "utf8");
text+=getColour(); 
fs.writeFileSync("./test.txt", text + "\n" + "this is new text");
