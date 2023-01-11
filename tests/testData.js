const User = require('../models/user')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const initialUsers = [
    {
        username: 'Pepe',
        name: 'Pepe Pepe'
    },
    {
        username: 'Yka',
        name: 'Yka'
    }
]
const testUser = {
    name: 'Test user',
    username: 'TestUser',
    password: 'TestPassword'
}

const testUserShortPassword = {
    name: 'Test user',
    username: 'TestUser1',
    password: 'Te'
}

const testUserExistingUser = {
    name: 'Test user',
    username: 'Pepe',
    password: 'TestPassword'
}

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
]
const testBlog =     {
    title: 'Testing blogs',
    author: 'Blog Tester',
    url: 'https://blogtester.com/',
    likes: 1,
}

const testBlogWithoutLikes =     {
    title: 'Testing blogs',
    author: 'Blog Tester',
    url: 'https://blogtester.com/'
}

const testBlogWithoutUrlAndTitle =     {
    author: 'Blog Tester',
    likes: 1
}
const initTestUsers = async() => {
    const saltRounds = 10
    await User.deleteMany({})
    initialUsers[0].passwordHash = await bcrypt.hash('Pepe', saltRounds)
    let userObject = new User(initialUsers[0])
    await userObject.save()
    initialUsers[1].passwordHash = await bcrypt.hash('Yka', saltRounds)
    userObject = new User(initialUsers[1])
    await userObject.save()
}
const initTestBlogs = async() => {
    await Blog.deleteMany({})
    await initTestUsers()
    const user = await User.findOne({ username: 'Pepe' })
    initialBlogs[0].user = user._id
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    initialBlogs[1].user = user._id
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
}
module.exports = {
    initialUsers,
    testUser,
    testUserExistingUser,
    testUserShortPassword,
    initTestUsers,
    initialBlogs,
    testBlog,
    testBlogWithoutLikes,
    testBlogWithoutUrlAndTitle,
    initTestBlogs
}