const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
})
blogsRouter.post('/', async(request, response,next) => {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0
    })
    try{
      const result = await blog.save()
      return response.status(201).json(result)
    }
    catch(error){
      next(error)
    }
})
blogsRouter.put('/:id', async(request, response,next) => {
  try {
    let blog = await Blog.findById(request.params.id)
    if(blog){
      await Blog.updateOne({_id: request.params.id}, request.body, { runValidators: true })
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
blogsRouter.delete('/:id', async(request, response, next) =>{
  try {
    const blog = await Blog.findById(request.params.id)
    if(blog){
      await Blog.deleteOne({id: request.params.id})
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