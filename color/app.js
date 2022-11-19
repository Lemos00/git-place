const fs = require("fs");
const core = require("@actions/core");
const width = 37;
const height = 5;

function Tile(colour, Xpos, Ypos){
    this.colour = colour,
    this.X = Xpos,
    this.Y = Ypos
}


let getTile = () =>{
    let issueTitle = core.getInput('title');
    let titleSplit = issueTitle.split("|");
    let tile = Tile(titleSplit[1], titleSplit[2], titleSplit[3]);
    return tile;
}

///////main\\\\\\\\

newTile = getTile();


let text = fs.readFileSync("./grid.txt", "utf8");


textArray = text.split("<!---->");
let location = newTile.Y*width + newTile.X;

textArray[location] = "NEW TILE";

let newGrid = "";
let i =0;
for(e in textArray){
    newGrid+=e;
    newGrid+="<!---->";
    if(i%37 == 0)
        newGrid+="\n";
    i++;
}

fs.writeFileSync("./grid.txt", newGrid);
