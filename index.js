/* Noooooooode.js
npm init => packagejson
npm install Moduel => package-lock.json , node_modules
 */

// window in js == global in node.js
// node is using file global and every file is a module
//console.log(global)


//const { sayHello, named } = require('./fun') // import from other file

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
// const server = http.createServer((req, res) => {
//   res.end('messege from server');
// })
// create a server with node.js
// server.listen(8000, () => {
//   console.log('start server');
// })


/* Expreeeeeeees.js & nodeeeeeeee.js */
// Express is a framework for Node.js
const express = require('express')
const morgan = require('morgan')

const app = express()


// MiddleWares
// to use middleware => we use app.use(middleware)
app.use(morgan("dev")) // used to know data from req was send & used before requestes
app.use(express.json()) // to under stand data was send as a json & it's a middleware
app.use(express.static(`${__dirname}/public`)) // to access on html files

app.use((req, res, next) => { // custome middleware
  console.log("this is a middleware")
  next() // to run next code and not stop runing her
})


/* Router intialize */
const pagesRouter = require('./router/pages')
app.use('/test', pagesRouter) // will add any rout after '/test'



/* Mongodb */
// npm install mongoose
const dataBaseConnect = require('./config/dataBase')
dataBaseConnect()



module.exports = app







