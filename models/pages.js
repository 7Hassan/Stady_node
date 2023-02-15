
const mongoose = require('mongoose')

// create Schema
const schema = new mongoose.Schema({
  name: { type: String, require: true, validate: { validator: (name) => name.length > 3 } }, // for validation
  names: { type: Array, require: true },
  exist: { type: Boolean, require: true },
  number: { type: Number, require: true },
  date: { type: Date, default: Date.now },
})
const schemaModel = mongoose.model('test', schema) //create model

module.exports = schemaModel // export sechema



