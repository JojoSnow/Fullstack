import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Routes, Route} from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'

import {initializeBlogs, createBlog, deleteBlog} from './reducers/blogReducer'
import {logoutUser} from './reducers/loginReducer'
import {initializeUsers} from './reducers/userReducer'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const users = useSelector(state => state.users)
	const loggedUser = useSelector(state => state.loggedUser)
	const blogFormRef = useRef()

	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
	}, [dispatch])

	useEffect(() => {
		if (loggedUser) {
			blogService.setToken(loggedUser.token)
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
			{blogForm()}
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
			
			{loggedUser === null ? (
				<LoginForm />
			) : (
				<div>
					
					<h2>blogs</h2>
					<p>
						{loggedUser.name} logged in{' '}
						<button id="logoutBtn" onClick={handleLogout}>
							Logout
						</button>
					</p>
					<Routes>
						<Route path='/users' element ={<Users users={users} />} />
						<Route path='/users/:id' element={<User users={users} />} />
						<Route path='/' element={blogsDiv()} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App
