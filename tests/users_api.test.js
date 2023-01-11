const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)
const {initialUsers, testUser,testUserShortPassword, testUserExistingUser,initTestUsers} = require('./testData')


describe('users tests',() =>{

    test('users are returned as json', async() =>{
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)
        expect(response.statusCode).toBe(200)  
    })
    test('when user makes a POST request to /api/users with valid input a new user should be created', async() =>{
        const responsePOST = await api.post('/api/users').send(testUser)
        expect(responsePOST.statusCode).toBe(201) 
        const responseGET = await api.get('/api/users')

        expect(responseGET.body).toHaveLength(3)
        expect(responseGET.body[2].username).toEqual('TestUser')
        expect(responseGET.body[2].name).toEqual('Test user')
        expect(responseGET.statusCode).toBe(200)  
    })
    test('when user makes a POST request to /api/users with invalid input 400 status code is returned and user is not created', async() =>{
        const responsePOST = await api.post('/api/users').send(testUserShortPassword)
        expect(responsePOST.statusCode).toBe(400) 
        expect(responsePOST.body).toEqual({'error': 'Password has to be at least 3 characters long'})
        const responseGET = await api.get('/api/users')
        expect(responseGET.body).toHaveLength(2)
        expect(responseGET.statusCode).toBe(200)  
    })
    test('when user makes a POST request to /api/users with existing username 400 status code is returned and user is not created', async() =>{
        const responsePOST = await api.post('/api/users').send(testUserExistingUser)
        expect(responsePOST.statusCode).toBe(400) 
        expect(responsePOST.body).toEqual({'error': 'Pepe is already in use'})
        const responseGET = await api.get('/api/users')
        expect(responseGET.body).toHaveLength(2)
        expect(responseGET.statusCode).toBe(200)  
    })
})
beforeEach(initTestUsers)
  afterAll(()=>{
    mongoose.connection.close()
})