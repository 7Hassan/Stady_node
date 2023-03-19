
const joi = require('joi') // package for validation for app not for database
const { modelName } = require('../models/pages')
const { catchError } = require('../errors/catchErrors')
const namesModel = require('../models/pages') // get schema model

exports.getHome = async (req, res) => {
  //! Query
  //? when get url => localhost:3000/home?name=hassan&age[lt]=20
  let obj = { ...req.query } //! obj => {name : 'hassan' , age : { lt: '20'}}
  obj = JSON.stringify(obj)

  //! advanced filtering in Data
  obj = obj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`) //? match => (gt|gte|lt|lte)
  let data = await namesModel.find(JSON.parse(obj))
  res.send(data)

  //! field
  const ff = await namesModel.countDocuments()
  console.log("🚀 ~ file: funs.js:22 ~ exports.getHome= ~ ff:", ff)

}

exports.getAbout = catchError(async (req, res) => res.send(req.query.sort))

exports.getProduct = catchError(async (req, res) => res.send("product"))

exports.postProduct = catchError(async (req, res) => {
  const { error } = validation(req.body) //! get error 
  //? Handling error 
  if (error) res.status(404).send(error.details[0].message)
  else {
    res.status(200).send('post done')
  }
})

exports.getProductParameter = catchError(async (req, res) => res.send("g"))


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

    const data = {
      "name": 'hassan',
      "age": {
        "$lt": 20 //? less than 20
      }
    }
    //! get names query and get objects inserted in it without __v and password fields
    const result = await namesModel.find(data).populate({ path: 'users', select: '-__v -password' }) 
    console.log("🚀 ~ file: funs.js:65 ~ getData ~ result:", result)
  } catch (err) {
    console.log("🚀 ~ file: funs.js:67 ~ getData ~ err:", err)
  }
  //! another way..
  try {
    // to find the object from database and select one element from it
    const result = await namesModel.find().where('name').equals('Hassan').where('rating').lt(5) //? lt => less than
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



// aggregate method will return a query
exports.getTourStats = async (reg, res) => {
  try {
    const stats = await modelName.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: 'difficulty' || null,
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: {
            $avg: '$ratingsAverage',
            avgPrice: {
              $avg: '$price',
              minPrice: { $min: '$price' },
              maxPrice: { $max: '$price' }
            }
          }
        }
      }
    ])
  } catch (err) {
    console.log('🚀 ~ file: funs.js:142 ~ exports.getTourStats= ~ err:', err)
  }
}