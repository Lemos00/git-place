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

let backwardsColorConvert = (colour) => {
    const upperCaseColor = colour.toUpperCase();
    switch(upperCaseColor) {
        case ":red_square:":
            return "RED";
        case ":orange_square:":
            return "ORANGE";
        case ":yellow_square:":
            return "YELLOW";
        case ":green_square:":
            return "GREEN";
        case ":blue_square:":
            return "BLUE";
        case ":purple_square:":
            return "PURPLE";
        case ":brown_square:":
            return "BROWN";
        case ":black_large_square:":
            return "BLACK";
        case ":white_large_square:":
            return "WHITE";
        default:
            return "WHITE";
    }
}



let formatTileLink = (x, y, colour) => {
    return "https://github.com/lemos00/git-place/issues/new?title=newcolour%7C" + x + "%7C" + y + "%7C" + backwardsColorConvert(colour) + "&body=Please+Input+your+color+and+%27Submit+new+issue%27"
}

let formatIndividualTile = (colour, link) => {
    return "[" + colour + "]" + "(" + link + ")";
}

let toTileArray = (gridText)=> {
    let array = gridText.split('\n');
    //let array = gridText.split("<!---->");
    console.log(array);
    let tileArray = []
    for(let i =0;i<array.length;i++){

        let tempRow = array[i].split("<!---->");
        let tempTileRow = [];

        for(let j = 0; j<tempRow.length;j++){
            let tempTile = new Tile(j, i, tempRow[j]);
            tempTileRow.push(tempTile);
        }
            
            tileArray.push(tempTileRow);
    }
    return tileArray;
}

let toGridText = (tileArray)=>{
    let text = "";
    for(let i =0; i<tileArray.length -1; i++){
        text+=tileArray[i].colour;
        text+="<!---->";
    }
    text+=tileArray[tileArray.length-1].colour;
    return text;
}
///////main\\\\\\\\

// create grid for main text file
let newTile = getTile();
let text = fs.readFileSync("./grid.txt", "utf8");
let tileArray = toTileArray(text);

newTile.colour = interpretColor(newTile.colour)
tileArray[newTile.X][newTile.Y] = newTile;

console.log(tileArray);

let newGrid = toGridText(tileArray);

// logic for readme file
let writeToReadme = (tileArray) => {
    let newReadmeFile = "";

    for (let i = 0; i < tileArray.length; i++) {
        newReadmeFile += formatIndividualTile(tileArray[i].colour,
            formatTileLink(tileArray[i].X, tileArray[i].Y, tileArray[i].colour))
    }

    fs.writeFileSync("./README.md", newReadmeFile);
}

fs.writeFileSync("./grid.txt", newGrid);
writeToReadme(tileArray);