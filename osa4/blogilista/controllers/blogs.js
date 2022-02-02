const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
	  .find({})
	  .then(blogs => {
		response.json(blogs.map(blog => blog.toJSON()))
	  })
  })
  
  blogsRouter.post('/', (request, response, next) => {
	const blog = new Blog(request.body)

	if (!(blog.title) || !(blog.url)) {
		return response.status(400).json({ error: 'content missing' })
	}

	if (!blog.likes) {
		blog.likes = 0
	}
  
	blog
	  .save()
	  .then(result => {
		response.status(201).json(result.toJSON())
	  })
	  .catch(error => next(error))
  })

module.exports = blogsRouter