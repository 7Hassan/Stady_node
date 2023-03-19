
const mongoose = require('mongoose')
const slugify = require('slugify')
const bcrypt = require('bcryptjs')
// create Schema
const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
    unique: [true, 'error unique'],
    //validate: { validator: (name) => name.length > 3 }, //? for custom validation
    maxlength: [30, 'error Length'],
    enum: {
      values: ['hassan', 'aya', 'ahmed'],//! only for this words 
      message: 'error not except this word'
    },
  },
  names: {
    type: [String], require: [true, "names must have a name"],//! error message will display
  },
  number: {
    type: Number,
    require: true,
    max: 10,
    min: 1
  },
  date: { type: Date, default: Date.now },
  //! Location of user
  location: { //? object
    //? Geo special data for locations
    type: {
      type: String,
      default: 'point',
      enum: ['point']
    },
    coordinate: [Number],
    address: String,
    description: String
  },
  location: [ //? Array in it object
    //! mongo will put for each object in this array an id
    {
      type: {
        type: String,
        default: 'point',
        enum: ['point']
      },
      coordinate: [Number], //? array of numbers
      stringsNames: Array, //? array of any thing input
      address: String,
      description: String
    }
  ],
  //? get users from data base schema
  users: [
    {
      type: mongoose.Schema.ObjectId, //? put id and will link with it
      ref: 'users' //? schema name in data base
    }
  ]
})

//? virtual populate to pages > reviews
nameSchema.virtual('populate', {
  ref: 'reviews',
  foreignField: 'pages',
  localField: '_id'
})



//! Document middleware run before save data
nameSchema.pre('save', function (next) => {
  this.name = slugify(this.name, { lower: true }) //? handling data before save
  console.log(this + 'saved')
  next()
})

//! Query middleware run before find data
nameSchema.pre('/^find/', function (next) => {
  this.find({ number: { $gt: 80 } }) //? when get any find data will find only data with number > 80 for secret data
  next()
})
nameSchema.post('/^find/', (docs, next) => {//? when data posted in data base
  console.log('🚀 ~ file: pages.js:27 ~ nameSchema.post ~ docs:', docs)
  next()
})

//! Aggravation middleware for more secret
nameSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
  console.log(this.pipeline())
  next()
})



//? Hashing a password
nameSchema.pre('save', async (next) => {
  if (!this.isModified('password')) return next() //? if password isn't change
  this.password = await bcrypt.hash(this.password, 12) //? hashing and 12 is size of cpu and is good to be 12
  this.cofirmPassword = undefined //? remove confirm password
  next()
})


const namesModel = mongoose.model('names', nameSchema)
module.exports = namesModel // export schema



