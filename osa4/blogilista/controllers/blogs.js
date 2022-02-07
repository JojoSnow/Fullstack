const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', {username: 1, name: 1, id: 1})
	response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', userExtractor, async (request, response) => {
	const blog = request.body
	const decodedToken = request.user

	if (!(blog.title) || !(blog.url)) {
		return response.status(400).json({ error: 'content missing' })
	}

	if (!blog.likes) {
		blog.likes = 0
	}

	if(!decodedToken.id) {
		return response.status(401).json({error: 'token missing or invalid'})
	}

	const user = await User.findById(decodedToken.id)

	const bloggie = new Blog({
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		user: user._id
	})

	const savedBlog = await bloggie.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const decodedToken = request.user
	const blog = await Blog.findById(request.params.id)

	if (decodedToken.id.toString() === blog.user.toString()) {
		await Blog.findByIdAndRemove(blog.id)
		response.status(204).end()
	} else {
		response.status(400).json({error: 'invalid user token'})
	}
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