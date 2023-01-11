const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum,blog) => sum+blog.likes,0)
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((favBlog, blog) => !favBlog ? blog : (favBlog.likes > blog.likes ? favBlog : blog),undefined)
}
const mostBlogs = (blogs) => {
    const authors = blogs.reduce((authors2,blog) => { authors2[blog.author] ? authors2[blog.author] +=1 : authors2[blog.author] = 1; return authors2},{})
    const mostBlogsAuthor = Object.keys(authors).reduce((mostBlogAuthor,author) => !authors[mostBlogAuthor] ? author :(authors[mostBlogAuthor] > authors[author] ? mostBlogAuthor : author),undefined)
    return mostBlogsAuthor ? {
        author: mostBlogsAuthor,
        blogs: authors[mostBlogsAuthor]
    }
        : undefined
}
const mostLikes = (blogs) => {
    const authors = blogs.reduce((authors2,blog) => { authors2[blog.author] ? authors2[blog.author] += blog.likes : authors2[blog.author] = blog.likes; return authors2},{})
    const mostLikesAuthor = Object.keys(authors).reduce((mostBlogAuthor,author) => !authors[mostBlogAuthor] ? author :(authors[mostBlogAuthor] > authors[author] ? mostBlogAuthor : author),undefined)
    return mostLikesAuthor ? {
        author: mostLikesAuthor,
        likes: authors[mostLikesAuthor]
    }
        : undefined
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}