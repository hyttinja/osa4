const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs',{ url:1,title:1,author:1,id:1 })

    return response.json(users)
})
usersRouter.post('/', async(request, response,next) => {
    try{
        if(request.body.password === undefined || request.body.password.length <3){
            throw new Error('Password has to be at least 3 characters long')
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

        const user = new User({
            name: request.body.name,
            username: request.body.username,
            passwordHash: passwordHash
        })
        const existingUsers = await User.find({ username:request.body.username })
        if(existingUsers.length > 0){
            throw new Error(`${request.body.username} is already in use`)
        }
        const result = await user.save()
        return response.status(201).json(result)
    }
    catch(error){
        next(error)
    }
})
module.exports = usersRouter