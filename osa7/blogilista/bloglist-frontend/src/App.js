import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

import {initializeBlogs, createBlog, deleteBlog} from './reducers/blogReducer'
import {logoutUser} from './reducers/loginReducer'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.loggedUser)
	const blogFormRef = useRef()

	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		if (user) {
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const addBlog = async blogObject => {
		blogFormRef.current.toggleVisibility()
		dispatch(createBlog(blogObject))
	}

	const delBlog = async id => {
		dispatch(deleteBlog(id))
	}	

	const blogForm = () => (
		<Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const blogsDiv = () => (
		<div>
			{blogs
				// .sort((a, b) => a.likes + b.likes)
				.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						removeBlog={delBlog}
					/>
				))}
		</div>
	)

	return (
		<div>
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<h2>blogs</h2>
					<p>
						{user.name} logged in{' '}
						<button id="logoutBtn" onClick={handleLogout}>
							Logout
						</button>
					</p>

					{blogForm()}
					{blogsDiv()}
				</div>
			)}
		</div>
	)
}

export default App
