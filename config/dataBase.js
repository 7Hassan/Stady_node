

const mongoose = require('mongoose');
const dataBaseLink = process.env.DATABASELINK || "mongodb://localhost/testMongo"

// connect with database

async function dataBaseConnect() {
  await mongoose.connect(dataBaseLink)
    .then(() => console.log('Connect with database'))
    .catch((err) => console.log("databaseError ====== " + err))
}


module.exports = dataBaseConnect