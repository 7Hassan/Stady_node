
const app = require('./index.js')

const dotenv = require('dotenv')
dotenv.config({ path: './.env' })


//create a server with express
const port = process.env.PORT
app.listen(port, () => {
  console.log("Start Server")
})
