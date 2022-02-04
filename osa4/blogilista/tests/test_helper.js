const Note = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'We Are Not Ourselves',
		author: 'Matthew Thomas',
		url: 'not yet found',
		likes: '3'
	},
	{
		title: 'Vox Machina Origins',
		authos: 'Dark Horse',
		url: 'was destroyed by Trinket',
		likes: '69'
	}
]

const blogsInDb = async () => {
	const blogs = await Note.find({})
	return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
  }

module.exports = {
	blogsInDb, usersInDb, initialBlogs
}