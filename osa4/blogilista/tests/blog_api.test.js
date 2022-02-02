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
  
	const titles = blogs.map(n => n.title)
	expect(titles).toContain('Hobbit')
  })

afterAll(() => {
  mongoose.connection.close()
})