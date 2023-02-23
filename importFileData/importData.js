
const fs = require('fs')
const dataBaseConnect = require('../config/dataBase')
const Names = require('../models/pages')

dataBaseConnect()
const data = JSON.parse(fs.readFileSync(`${__dirname}/../Data/data.json`, 'utf-8'))
if (process.argv[2] == 'delete') {  //? What i write in terminal
  getData()
  deleteData()
  seedData()
  getData()
}







async function seedData() {
  try {
    const result = await Names.create(data)
    console.log("🚀 ~ file: importData.js:23 ~ seedData ~ result:", result)
  } catch (err) {
    console.log("🚀 ~ file: importData.js:18 ~ err:", err)

  }
}
async function deleteData() {
  try {
    await Names.deleteMany()
    console.log('Data deleted')
  } catch (err) {
    console.log("🚀 ~ file: importData.js:18 ~ err:", err)
  }
}
async function getData() {
  try {
    const result = await Names.find()
    console.log("🚀 ~ file: importData.js:39 ~ deleteData ~ result:", result)
  } catch (err) {
    console.log("🚀 ~ file: importData.js:18 ~ err:", err)
  }
}




