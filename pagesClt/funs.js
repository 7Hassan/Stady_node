
const joi = require('joi') // package for validation for app not for database
const pagesModel = require('../models/pages') // get schema model


exports.getHome = (req, res) => res.send("Home")

exports.getAbout = (req, res) => res.send("about")

exports.getProduct = (req, res) => res.send("product")

exports.postProduct = (req, res) => {
  const { error } = validation(req.body) // get error 
  // Handling error 
  if (error) res.status(404).send(error.details[0].message)
  else {
    createData()
    getData()
    res.status(200).send('post done')
  }
}

exports.getProductParameter = (req, res) => {
  //req.params => id
  if (req.params.id == "hassan")
    return res.send(req.params.id)
  if (req.params.id != "hassan")
    return res.status(400).send("none")
}

// function of validation
function validation(data) {
  const model = { // Stander Model 
    name: joi.string().min(3).required()
  }
  return joi.validate(data, model) // compare between data send and the model then return value
}

// Seed database
async function createData() {
  const data = new pagesModel({
    name: "Hassan",
    names: ["gg", "xklk"],
    exist: true,
    number: 678,
  })
  await data.save().then(() => console.log("data saved")).catch((err) => console.log("data not saved " + err))
}

// get Data
async function getData() {
  const result = await pagesModel.findOne({ name: "Has" }).select({ exist: 1 }) // to find the object from database and select one element from it
  console.log(result)
}