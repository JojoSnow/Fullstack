const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')
const blog = require('../models/blog')

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})
  
		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})
  
	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()
  
		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}
  
		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)
  
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username or password is too short', async () => {
		const invalidUsername = {
			username: 'hi',
			name: 'hello world',
			password: 'secret'
		}
	
		const invalidPassword = {
			username: 'Heppu',
			name: 'hello world',
			password: 'hi'
		}
	
		await api
			.post('/api/users')
			.send(invalidUsername)
			.expect(400)
	
		await api
			.post('/api/users')
			.send(invalidPassword)
			.expect(400)
	})
})

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
	const ids = response.body.map(b => b.id)
	expect(ids).toBeDefined()
})

test('a valid blog can be added ', async () => {
	const responseBlog = await api.get('/api/blogs')
	const responseUser = await api.get('/api/users')
	const body = await responseUser.body

	console.log(body)

	const newBlog = {
		'title': 'Hobbit',
		'author': 'J.R.R. Tolkien',
		'url': 'got stolen by a dragon',
		'likes': '200'
	}
  
	await api
		.post('/api/blogs')
		.set('Authorization', token)
		.send(newBlog)
		.expect('Content-Type', /application\/json/)
  
  
	const blogs = await helper.blogsInDb()
	expect(blogs).toHaveLength(responseBlog.body.length + 1)
  
	const titles = blogs.map(b => b.title)
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

	const titles = blogsAtEnd.map(b => b.title)
	expect(titles).not.toContain(blogToDel.title)
})

test('a blog can be updated', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToUpdate = blogsAtStart[0]
	const newBlog = {
		title: 'Hello World',
		author: 'People of Earth',
		url: 'buried deep in the earth',
		likes: '1000'
	}

	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()

	const titles = blogsAtEnd.map(b => b.title)
	const likes = blogsAtEnd.map(b => b.likes)

	expect(titles).toContain('Hello World')
	expect(likes).toContain(1000)
})



afterAll(() => {
	mongoose.connection.close()
})