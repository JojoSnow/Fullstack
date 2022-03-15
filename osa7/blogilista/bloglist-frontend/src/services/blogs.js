import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const request = axios.get(baseUrl)
	const response = await request
	return response.data
}

const create = async newBlog => {
	const config = {
		headers: {Authorization: token},
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const createComment = async (blog, comment) => {
	const comments = blog.comments.concat(comment)
	const newObject = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		id: blog.id,
		likes: blog.likes,
		comments: comments
	}
	const request = axios.put(`${baseUrl}/${blog.id}`, newObject)
	const response = await request
	return response.data
}

const update = async (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	const response = await request
	return response.data
}

const del = async id => {
	const config = {
		headers: {Authorization: token},
	}
	const request = axios.delete(`${baseUrl}/${id}`, config)
	const response = await request
	return response.data
}

const like = async (blog) => {
	const likes = blog.likes + 1
	const newObject = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		id: blog.id,
		comments: blog.comments,
		likes: likes
	}
	const request = await axios.put(`${baseUrl}/${blog.id}`, newObject)
	return request.data
}

export default {getAll, create, update, del, setToken, like, createComment}
