import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Routes, Route, Link} from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'

import {initializeBlogs, createBlog} from './reducers/blogReducer'
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
					<Blogs
						key={blog.id}
						blog={blog}
					/>
				))}
		</div>
	)

	const padding = {
		padding: 5
	}

	const navStyle = {
		backgroundColor: 'lightgrey',
		padding: 5
	}

	return (
		<div>
			
			{loggedUser === null ? (
				<LoginForm />
			) : (
				<div>
					<div style={navStyle}>
						<Link style={padding} to="/blogs">Blogs</Link>
						<Link style={padding} to="/users">Users</Link>
						{loggedUser.name} logged in{' '}
						<button id="logoutBtn" onClick={handleLogout}>
							Logout
						</button>
					</div>

					<h2>Blog App</h2>
					<p>
						
					</p>
					<Routes>
						<Route path='/users' element ={<Users users={users} />} />
						<Route path='/users/:id' element={<User users={users} />} />
						<Route path='/blogs/:id' element={<Blog blogs={blogs} />} />
						<Route path='/' element={blogsDiv()} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App
