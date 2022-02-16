import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()

	useEffect(() => {
    	blogService.getAll().then(bs =>
    		setBlogs(bs)
    	)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON)
			setUser(loggedUser)
			blogService.setToken(loggedUser.token)
		}
	}, [])

	const handleLogin = async (event) => {
    	event.preventDefault()

    	try {
    		const newUser = await loginService.login({username, password})

			localStorage.setItem(
				'loggedBlogUser', JSON.stringify(newUser)
			)

			blogService.setToken(newUser.token)
    		setUser(newUser)
    		setUsername('')
    		setPassword('')
    	} catch (exception) {
    		console.log('wrong credentials')
    	}
	}

	const handleLogout = async () => {
		localStorage.removeItem('loggedBlogUser')

		setUser(null)
	}

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		await blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
			})
	}

	const delBlog = async (id) => {
		await blogService
			.del(id)
			.catch(error => console.log(error))
	}

	const addLike = async (id, blogObject) => {
		await blogService
			.update(id, blogObject)
			.catch(error => console.log(error))
	}

  	const loginForm = () => (
		<form onSubmit={handleLogin}>
			
			<div>
				username
					<input type="text" value={username} name="Username"
					onChange={({target}) => setUsername(target.value)} />
			</div>
			<div>
				password
					<input type="password" value={password} name="Password"
					onChange={({target}) => setPassword(target.value)} />
			</div>
			<button type="submit">Login</button>
		</form>
	)

	const blogForm = () => (
		<Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>	
	)

	const blogsDiv = () => (
		<div>
    		{blogs
				.sort((a, b) => a.likes + b.likes)
				.map(blog =>
    				<Blog key={blog.id} blog={blog} addLikes={addLike} removeBlog={delBlog} />
      		)}
    	</div>
	)

	return (
		<div>
			{user === null ?
				<div>
					<h2>log in to application</h2>
						{loginForm()}
				</div> :
				<div>
					<h2>blogs</h2>
						<p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

						{blogForm()}
							
						{blogsDiv()}
				</div>
			}
		</div>
	)
}

export default App