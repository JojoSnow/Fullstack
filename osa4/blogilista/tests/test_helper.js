const Note = require('../models/blog')

const blogsInDb = async () => {
	const blogs = await Note.find({})
	return blogs.map(note => note.toJSON())
}

module.exports = {
	blogsInDb
}