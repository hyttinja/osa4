const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { initialBlogs, testBlog,testBlogWithoutLikes,testBlogWithoutUrlAndTitle,initTestBlogs } = require('./testData')
const app = require('../app')

const api = supertest(app)

describe('blogs tests',() => {


    test('blogs are returned as json', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
        expect(response.statusCode).toBe(200)
    })
    test('identity field in returned blogs should be id', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
        expect(response.body[1].id).toBeDefined()
        expect(response.statusCode).toBe(200)
    })
    test('when user makes a POST request to /api/blogs with valid input a new blog should be added', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token

        const responsePOST = await api.post('/api/blogs').send(testBlog).set({ Authorization: `Bearer ${token}` })
        expect(responsePOST.statusCode).toBe(201)
        const responseGET = await api.get('/api/blogs')

        expect(responseGET.body).toHaveLength(3)
        expect(responseGET.body[2].title).toEqual('Testing blogs')
        expect(responseGET.body[2].author).toEqual('Blog Tester')
        expect(responseGET.body[2].url).toEqual('https://blogtester.com/')
        expect(responseGET.body[2].likes).toBe(1)
        expect(responseGET.statusCode).toBe(200)
    })

    test('when user makes a POST request to /api/blogs with input without likes a new blog should be added with zero likes', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token
        const responsePOST = await api.post('/api/blogs').send(testBlogWithoutLikes).set({ Authorization: `Bearer ${token}` })
        expect(responsePOST.statusCode).toBe(201)
        const responseGET = await api.get('/api/blogs')
        expect(responseGET.body).toHaveLength(3)
        expect(responseGET.body[2].title).toEqual('Testing blogs')
        expect(responseGET.body[2].author).toEqual('Blog Tester')
        expect(responseGET.body[2].url).toEqual('https://blogtester.com/')
        expect(responseGET.body[2].likes).toBe(0)
        expect(responseGET.statusCode).toBe(200)
    })
    test('when user makes a POST request to /api/blogs with input without title and url a new blog should not be added, instead 400 statuscode is returned', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token
        const responsePOST = await api.post('/api/blogs').send(testBlogWithoutUrlAndTitle).set({ Authorization: `Bearer ${token}` })
        expect(responsePOST.statusCode).toBe(400)
        const responseGET = await api.get('/api/blogs')
        expect(responseGET.body).toHaveLength(initialBlogs.length)
        expect(responseGET.statusCode).toBe(200)
    })
    test('when user makes a POST request to /api/blogs with valid input, but without  a token no blog should be created and 401 is returned', async() => {
        const responsePOST = await api.post('/api/blogs').send(testBlog)
        expect(responsePOST.statusCode).toBe(401)
        const responseGET = await api.get('/api/blogs')
        expect(responseGET.body).toHaveLength(2)
    })
    test('when user makes a DELETE request to /api/blogs/:id with existing blog\'s id, the blog is deleted and 204 is returned', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token
        const responseGET = await api.get('/api/blogs')
        expect(responseGET.statusCode).toBe(200)
        const responseDELETE = await api.delete(`/api/blogs/${responseGET.body[0].id}`).send(testBlogWithoutLikes).set({ Authorization: `Bearer ${token}` })
        expect(responseDELETE.statusCode).toBe(204)
        const responseGET2 = await api.get('/api/blogs')
        expect(responseGET2.body).toHaveLength(1)
        expect(responseGET2.statusCode).toBe(200)
    })
    test('when user makes a DELETE request to /api/blogs/:id with non-existing blog\'s id, 404 is returned and blogs state stays the same', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token
        const responseDELETE = await api.delete('/api/blogs/000000000000000000000000').set({ Authorization: `Bearer ${token}` })
        expect(responseDELETE.statusCode).toBe(404)
        const responseGET = await api.get('/api/blogs')
        expect(responseGET.body).toHaveLength(2)
        expect(responseGET.statusCode).toBe(200)
    })
    test('when user makes a PUT request to /api/blogs/:id with existing blog\'s id and valid input the blog entry is updated', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token
        const responseGET = await api.get('/api/blogs')
        expect(responseGET.statusCode).toBe(200)
        const updatedBlog = {
            author: responseGET.body[0].author,
            title: responseGET.body[0].title,
            url: responseGET.body[0].url,
            likes: responseGET.body[0].likes+1
        }
        const responsePUT = await api.put(`/api/blogs/${responseGET.body[0].id}`).send(updatedBlog).set({ Authorization: `Bearer ${token}` })
        expect(responsePUT.statusCode).toBe(204)
        const responseGET2 = await api.get('/api/blogs')
        expect(responseGET2.statusCode).toBe(200)
        expect(responseGET2.body[0].likes).toEqual(responseGET.body[0].likes+1)

    })
    test('when user makes a PUT request to /api/blogs/:id with non-existing blog\'s id, 404 is returned', async() => {
        const loginResponse = await api.post('/api/login').send({ username:'Pepe',password:'Pepe' })
        const token = loginResponse.body.token
        const responsePUT = await api.put('/api/blogs/000000000000000000000000').send(testBlog).set({ Authorization: `Bearer ${token}` })
        expect(responsePUT.statusCode).toBe(404)
    })
})
beforeEach(initTestBlogs)
afterAll(() => {
    mongoose.connection.close()
})