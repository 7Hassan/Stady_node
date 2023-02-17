

const fs = require('fs')
setTimeout(() => console.log("Time fun"), 0)

setImmediate(() => console.log("Immediate fun"))

fs.readFile('index.js', () => console.log("file readed"))

console.log("first")