const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

blogsRouter.get('/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})
  
blogsRouter.post('/blogs', (request, response) => {
    const content = new Blog(request.body)

    content
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter