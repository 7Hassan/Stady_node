
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