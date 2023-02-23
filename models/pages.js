
const mongoose = require('mongoose')

// create Schema
const nameSchema = new mongoose.Schema({
  name: { type: String, require: false, validate: { validator: (name) => name.length > 3 } }, // for validation
  names: { type: [String], require: [true, "names must have a name"] }, //! error message will display
  number: { type: Number, require: true },
  date: { type: Date, default: Date.now },
})
/*
TODO: Create a model
! Names => collection in data base
*/
const namesModel = mongoose.model('names', nameSchema)

module.exports = namesModel // export schema



