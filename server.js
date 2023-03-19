

/* Error handling must be above of a code */
//! uncaught Expectation & application must be crashed
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('Server is shuting down...')
  //! must crash application
  process.exit(1)
})

const app = require('./index.js')
const port = process.env.PORT
const mongoose = require('mongoose')
const dataBaseLink = process.env.DATA_BASE_URL.replace('<PASSWORD>', process.env.DATA_BASE_PASSWORD)

//create a server with express
const server = app.listen(port, () => {
  console.log("Start Server")
})

// connect with database
mongoose.set('strictQuery', true);
mongoose.connect(dataBaseLink).then(() => console.log('Connect with database'))


//! handling errors connection with DataBase
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('Server is shuting down...')
  //? optional to crash application
  server.close(() => process.exit(1))
})













/* 

-- Run DataBase in Terminal --
mongosh => to start server database
use test => to switch to a test db
show dbs => to show all dbs
show collection => to show all collection
db.test.insertOne({name: "Hassan"}) => to insert this 'Bson' object in 'test' collection
db.test.insertMany([{name: "Hassan"},{name: "Hassan"}]) => to insert many 'Bson' object in 'test' collection
db.test.find() => to show all data in 'test' collection
db.test.find({name : "Hassan"}) => to search for this object
db.test.find({price : {$lte : 500}) => to search for the objects that price 'less than eqaul' 500
db.test.find({price : {$gte : 500}) => to search for the objects that price 'greater than equal' 500
db.test.find({price : {$gt : 500}) => to search for the objects that price 'greater than' 500
db.test.find({$or : [{price : {$lte : 500},{name : "Hassan"}]) => to search for the objects that price 'greater than' 500
db.test.updateOne({name : "Hassan"},{$set : {price : 400}}) => to update one object data
db.test.updateMany({name : "Hassan"},{$set : {price : 400}}) => to update many object data
db.test.deleteMany({name : "Hassan"}) => to delete any object contain 'Hassan'

*/