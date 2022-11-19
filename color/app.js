const fs = require("fs");
const core = require("@actions/core");
const WIDTH = 37;
const HEIGHT = 5;

function Tile(Xpos, Ypos, colour){
    this.colour = colour,
    this.X = Xpos,
    this.Y = Ypos
}


let getTile = () =>{
    let issueTitle = core.getInput('title');
    let titleSplit = issueTitle.split("|");
    let tile = new Tile(titleSplit[1], titleSplit[2], titleSplit[3]);
    return tile;
}

// get name of each emoji based on input color
let interpretColor = (colour) => {
    const upperCaseColor = colour.toUpperCase();
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
        default:
            return ":white_large_square:";
    }
}

let formatTileLink = (x, y, colour) => {
    return "https://github.com/lemos00/git-place/issues/new?title=newcolour%7C" + x + "%7C" + y + "%7C" + colour + "&body=Please+Input+your+color+and+%27Submit+new+issue%27"
}

let formatIndividualTile = (colour, link) => {
    return "[" + interpretColor(colour) + "]" + "(" + link + ")";
}

///////main\\\\\\\\

let newTile = getTile();
let text = fs.readFileSync("./grid.txt", "utf8");
let textGrid = text.split("<!---->");

console.log(textGrid);

//let location = newTile.Y*WIDTH + newTile.X;

textGrid[newTile.X] = interpretColor(newTile.colour);

console.log(textGrid);

let newGrid = "";
// for (let i = 0; i < textGrid[0].length; i++) {
//     for (let j = 0; j < textGrid[0][0].length; j++) {
//         let readColor = textGrid[i][j];
//         newGrid += readColor//formatIndividualTile(readColor, formatTileLink(i, j, readColor))
//         newGrid += "<!---->";
//     }
//     newGrid += "\n";
// }


for (let i = 0; i < textGrid.length; i++) {
    let readColor = textGrid[i];
    newGrid += readColor//formatIndividualTile(readColor, formatTileLink(i, j, readColor))
    newGrid += "<!---->";
    }
fs.writeFileSync("./grid.txt", newGrid);
