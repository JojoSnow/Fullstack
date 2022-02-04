const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogsRouter.post('/', async (request, response) => {
	const blog = request.body

	if (!(blog.title) || !(blog.url)) {
		return response.status(400).json({ error: 'content missing' })
	}

	if (!blog.likes) {
		blog.likes = 0
	}

	const user = await User.findById(blog.user)

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