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
module.exports = {
    errorHandler
}