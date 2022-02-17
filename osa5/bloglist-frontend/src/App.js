import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'


const App = () => {
	const [blogs, setBlogs] = useState([])
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

	const handleLogin = (newUser) => {
		setUser(newUser)
	}

	const handleLogout = () => {
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
				<LoginForm login={handleLogin} /> :
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