import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		appendBlog(state, action) {
			state.push(action.payload)
		}
	}
})

export const {setBlogs, appendBlog} = blogSlice.actions

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = content => {
	return async dispatch => {
		const newBlog = await blogService.create(content)
		dispatch(appendBlog(newBlog))
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const likeBlog = (object) => {
	return async dispatch => {
		await blogService.like(object)
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const deleteBlog = (id) => {
	return async dispatch => {
		await blogService.del(id)
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export default blogSlice.reducer