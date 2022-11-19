// const fs = require("fs");
const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
    res.write("Hello Node");
    let text = fs.readFileSync("notes.txt", "utf-8");
    console.log(text);
    res.end();
})


server.listen(port, (error) => {
    if (error) {
        console.log("something went wrong");
    } else {
        console.log("Server is listening on port " + port);
    }
})


// let fileText = fs.readFileSync("notes.txt", "utf-8");
// console.log(fileText)