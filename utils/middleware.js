const User = require('../models/user')
const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) => {
    console.log('ErrorHandler:')
    console.error(error.message)
    if(error.message){
      response.status(400).json({ error: error.message }).end()
    }
    else{
      response.status(500).json().end()
    }
    next(error)
}
const tokenExtractor = (request, response, next) =>{
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7);
  }
  next()
}
const userExtractor = async(request, response, next) =>{
  if(request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findOne({_id:decodedToken.id})
    request.user = user
  }
  next()
}
module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}