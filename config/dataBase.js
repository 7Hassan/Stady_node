
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const dataBaseLink = process.env.DATABASELINK


// connect with database
async function dataBaseConnect() {
  await mongoose.connect(dataBaseLink)
    .then(() => console.log('Connect with database'))
    .catch((err) => console.log("databaseError ====== " + err))
}
module.exports = dataBaseConnect

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
