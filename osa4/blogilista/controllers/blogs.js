const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs.map(blog => blog.toJSON()))
		})
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}
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

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = await request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
	
	response.json(updateBlog.toJSON())
})

module.exports = blogsRouter