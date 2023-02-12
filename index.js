
// npm init => package.json
// npm install Moduel => package-lock.json , node_modules





// window in js == global in node.js
// node is using file global and every file is a module
//console.log(global)


const { sayHello, named } = require('./fun') // import from other file


/*  File Systems Module */
const fs = require('fs');
const text = fs.readFileSync('./index.js', 'utf-8'); //read a file => bad
fs.readFile('./index.js', 'utf-8', (err, data) => { //good
  //console.log(data)
})
//fs.writeFileSync('./run', text); //create a file


/* Opertaing System Module */
const os = require('os');
//console.log(os.userInfo()) information about system
//console.log(os.arch())
//console.log(os.networkInterfaces()) about network
//console.log(os.cpus()) about cpu
//console.log(os.totalmem()) about memory


/* Path Module */
const path = require('path')
//console.log(__dirname) located folder
//console.log(__filename) located file













/* Http Module */
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('messege from server');
})
server.listen(8000, () => {
  console.log('start server');
})
