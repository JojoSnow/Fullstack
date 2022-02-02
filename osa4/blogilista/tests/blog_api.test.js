const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

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
		'url': 'unknown',
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
		'url': 'got eaten by a vampire',
		'likes': ''
	}

	await api
		.post('/api/blogs')
		.send(newBlog)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})