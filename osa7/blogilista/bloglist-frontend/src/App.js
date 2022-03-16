import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Routes, Route, Link} from 'react-router-dom'
import {Navbar, Button, Nav} from 'react-bootstrap'

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
			<h2 className="my-3">Blogs</h2>
			{blogForm()}
			{blogs
				// .sort((a, b) => a.likes + b.likes)
				.map(blog => (
					<Blogs key={blog.id} blog={blog} />
				))}
		</div>
	)

	return (
		<div className='container'>
			{loggedUser === null ? (
				<LoginForm />
			) : (
				<>
					<Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mt-2">
						<Navbar.Brand>Blog App</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
							<Nav>
								<Nav.Item as="li">
									<Nav.Link href="#" as="span">
										<Link to="/">
											Blogs
										</Link>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
									<Nav.Link href="#" as="span">
										<Link to="/users">
											Users
										</Link>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item as="li">
										<Navbar.Text className="mr-2">
											{loggedUser.name} logged in
											<Button variant="outline-dark" size="sm" id="logoutBtn" onClick={handleLogout}>
												Logout
											</Button>
										</Navbar.Text>
								</Nav.Item>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
					<Routes>
						<Route
							path="/users"
							element={<Users users={users} />}
						/>
						<Route
							path="/users/:id"
							element={<User users={users} />}
						/>
						<Route
							path="/blogs/:id"
							element={<Blog blogs={blogs} />}
						/>
						<Route path="/" element={blogsDiv()} />
					</Routes>
				</>
					
			)}
		</div>
	)
}

export default App
