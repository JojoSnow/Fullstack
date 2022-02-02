const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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



afterAll(() => {
  mongoose.connection.close()
})