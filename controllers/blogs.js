const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user',{ id:1,name:1,username:1 })
    return response.json(blogs)
})
blogsRouter.post('/', async(request, response,next) => {
    try{
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'User is not logged in' })
        }
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes || 0,
            user: user._id
        })


        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        return response.status(201).json(savedBlog)
    }
    catch(error){
        next(error)
    }
})
blogsRouter.put('/:id', async(request, response,next) => {
    try {
        let blog = await Blog.findById(request.params.id)
        if(blog){
            await Blog.updateOne({ _id: request.params.id }, request.body, { runValidators: true })
            return response.status(204).end()
        }
        else{
            return response.status(404).end()
        }
    }
    catch(error){
        next(error)
    }
})
blogsRouter.delete('/:id', async(request, response, next) => {
    try {
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'User is not logged in' })
        }
        const blog = await Blog.findById(request.params.id)
        if(blog){
            if(blog.user.toString() !== user._id.toString()){
                return response.status(401).json({ error: 'Unauthorized user' })
            }
            await Blog.deleteOne({ _id: request.params.id })
            return response.status(204).end()
        }
        else{
            return response.status(404).end()
        }
    }
    catch(error){
        next(error)
    }
})
module.exports = blogsRouter