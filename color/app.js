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
let interpretColor = (tile) => {
    const upperCaseColor = tile.colour.toUpperCase();
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

///////main\\\\\\\\

let newTile = getTile();
let text = fs.readFileSync("./grid.txt", "utf8");
let textArray = text.split("<!---->");
let location = newTile.Y*WIDTH + newTile.X;

textArray[location] = interpretColor(newTile);

//let text = fs.readFileSync("./test.txt", "utf8");
console.log(interpretColor(newTile));
//fs.writeFileSync("./test.txt", text + "\n" + "this is new text");

let newGrid = "";
let i =0;
for(e in textArray){
    newGrid+=textArray[e];
    newGrid+="<!---->";
    if(i%37 == 0)
        newGrid+="\n";
    i++;
}

for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
        // += each new given tile

    }
    // write the new line break row
}

fs.writeFileSync("./grid.txt", newGrid);
