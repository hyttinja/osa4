require('dotenv').config()
let PORT = process.env.PORT
let MONGODB_URI = "mongodb+srv://fullstack:Kuusamo123@cluster0.eepkyxh.mongodb.net/?retryWrites=true"//process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}