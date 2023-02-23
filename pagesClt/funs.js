
const joi = require('joi') // package for validation for app not for database
const namesModel = require('../models/pages') // get schema model


exports.getHome = (req, res) => res.send("Home")

exports.getAbout = (req, res) => res.send("about")

exports.getProduct = (req, res) => res.send(req.params.id)

exports.postProduct = (req, res) => {
  const { error } = validation(req.body) //! get error 
  //? Handling error 
  if (error) res.status(404).send(error.details[0].message)
  else {
    //createData()
    // getData()
    // updateData()
    // deleteData()
    res.status(200).send('post done')
  }
}

exports.getProductParameter = (req, res) => {
  //req.params => id
  res.send("g")
  // if (req.params.id == "hassan")
  //   return res.send(req.params.id)
  // if (req.params.id != "hassan")
  //   return res.status(400).send("none")
}

//TODO: Validation
function validation(data) {
  //? Stander Model 
  const model = {
    name: joi.string().min(3).required()
  }
  // compare between data send and the model then return value
  return joi.validate(data, model)
}

//!---------------------------------------------------------------

//TODO: Create DATA
async function createData() {

  const data = {
    name: "Hassan",
    names: ["gg", "day"],
    exist: false,
    number: 678,
  }
  //? way to save data in data base
  // const createData = new namesModel(data)
  // await createData.save().then(() => console.log("data saved")).catch((err) => console.log("data not saved " + err))

  //! another away i prefer
  namesModel.create(data).then(() => console.log("🚀 ~ Data saved")).catch((err) => console.log("🚀 ~ Data not saved", err))
}

//TODO: Get DATA
async function getData() {
  try {
    // to find the object from database and select one element from it
    const result = await namesModel.find()
    console.log("🚀 ~ file: funs.js:65 ~ getData ~ result:", result)
  } catch (err) {
    console.log("🚀 ~ file: funs.js:67 ~ getData ~ err:", err)
  }
}

//TODO: Update DATA
async function updateData() {
  try {
    const result = await namesModel.findOneAndUpdate({ name: 'Hassan' }, { name: 'Mohamed' }, { new: true, runValidators: true });
    const result2 = await namesModel.findOneAndUpdate({ name: 'Hassan' }, { name: 'Mohamed' }, optionCallbackFun);

  } catch (err) {
    console.log("🚀 ~ file: funs.js:76 ~ updateData ~ err:", err)
  }
}

//TODO: Delete DATA
async function deleteData() {
  try {
    await namesModel.findOneAndDelete({ name: 'Hassan' })
  } catch (err) {
    console.log("🚀 ~ file: funs.js:76 ~ updateData ~ err:", err)
  }
}