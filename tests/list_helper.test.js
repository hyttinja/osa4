const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list is empty the amount of total likes is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })


    test('when list has many blogs, the total likes equals sum of likes in all the blogs', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favourite blog', () => {

    test('when list is empty the favourite blog is undefined', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(undefined)
    })

    test('when list has only one blog, favourite blog is that one', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(    {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        })
    })


    test('when list has many blogs, the favourite blog is the blog with the most likes (Edsger W. Diskstra\'s Canonical string reduction with 12 likes)', () => {
        const result = listHelper.favoriteBlog(blogs)

        expect(result).toEqual(      {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    })

})
describe('most blogs', () => {
    test('when list is empty the author with the most blogs is undefined', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(undefined)
    })
    test('when list has only one blog, the author with the most blogs is that one', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'blogs': 1 })
    })

    test('when list has many blogs, the author with the most blogs is Robert C. Martin', () => {
        const result = listHelper.mostBlogs(blogs)

        expect(result).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
    })

})
describe('most likes', () => {
    test('when list is empty the author with the most likes is undefined', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(undefined)
    })
    test('when list has only one blog, the author with the most likes is that one', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 5 })
    })

    test('when list has many blogs, the author with the most likes is Edsger W. Dijkstra with 17 likes', () => {
        const result = listHelper.mostLikes(blogs)

        expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 17 })
    })
})