

const express = require('express')
const funsPages = require('../pagesClt/funs')
const Router = express.Router()

// this is a middleware to get any parameter request
Router.param('id', (req, res, next, val) => console.log(val))

// Requested
Router.route("/home").get(funsPages.getHome)

Router.route("/about").get(funsPages.getAbout)

Router.route("/about/product").get(funsPages.getProduct).post(funsPages.postProduct)

Router.route("/about/product:id").get(funsPages.getProductParameter) // Get Route parameter

module.exports = Router




