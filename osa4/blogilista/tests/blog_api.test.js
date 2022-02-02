const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	await blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blogs have correct id tag', async () => {
	const response = await api.get('/api/blogs')
	const ids = response.body.map(blog => blog.id)
	expect(ids).toBeDefined()
})

test('a valid blog can be added ', async () => {
	const response = await api.get('/api/blogs')

	const newBlog = {
		'title': 'Hobbit',
		'author': 'J.R.R. Tolkien',
		'url': 'got stolen by a dragon',
		'likes': '200'
	}
  
	await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect('Content-Type', /application\/json/)
  
  
	const blogs = await helper.blogsInDb()
	expect(blogs).toHaveLength(response.body.length + 1)
  
	const titles = blogs.map(blog => blog.title)
	expect(titles).toContain('Hobbit')
})

test('a blog without likes can be added', async () => {

	const newBlog = {
		'title': 'Vampire Lestat',
		'author': 'Anne Rice',
		'url': 'got eaten by a vampire'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('a blog without author or url is not valid', async () => {

	const blogNoUrl = {
		'title': 'Cash',
		'author': 'Johnny Cash',
		'likes': '20'
	}

	const blogNoAuthor = {
		'author': 'Johnny Cash',
		'url': 'never left the building',
		'likes': '20'
	}

	await api
		.post('/api/blogs')
		.send(blogNoUrl)
		.expect(400)

	await api
		.post('/api/blogs')
		.send(blogNoAuthor)
		.expect(400)

})

test('a blog can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDel = await blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDel.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

	const titles = blogsAtEnd.map(blog => blog.title)
	expect(titles).not.toContain(blogToDel.title)
})

afterAll(() => {
	mongoose.connection.close()
})