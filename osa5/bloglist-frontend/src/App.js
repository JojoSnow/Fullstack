import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

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

			window.localStorage.setItem(
				'loggedBlogUser', JSON.stringify(newUser)
			)

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

	const addBlog = async (event) => {
		event.preventDefault()
		const blogObject = {
			title: title,
			author: author,
			url: url
		}

		await blogService
			.create(blogObject)
			.then(returnedBlog => {
				console.log('created')
				setBlogs(blogs.concat(returnedBlog))
				setTitle('')
				setAuthor('')
				setUrl('')
			})
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

	const blogsDiv = () => (
		<div>
    		{blogs.map(blog =>
    			<Blog key={blog.id} blog={blog} />
      		)}
    	</div>
	)

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<label htmlFor="Title">Title:</label>
			<input type="text" value={title} name="Title"
			onChange={({target}) => setTitle(target.value)} /> <br/>
			<label htmlFor="Author">Author:</label>
			<input type="text" value={author} name="Author"
			onChange={({target}) => setAuthor(target.value)} /> <br/>
			<label htmlFor="Url">Url:</label>
			<input type="text" value={url} name="Url"
			onChange={({target}) => setUrl(target.value)} /> <br/>
			<button type="submit">Create</button>
		</form>
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

					<h2>create new</h2>
						{blogForm()}
						
						{blogsDiv()}
				</div>}
		</div>
	)
}

export default App