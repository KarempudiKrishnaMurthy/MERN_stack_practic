const fs = require("fs");

// Reading from a file
const data = fs.readFileSync("hello.txt", "utf8");
console.log("File Content:", data);
