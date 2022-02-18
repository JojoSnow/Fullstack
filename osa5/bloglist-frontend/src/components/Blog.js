import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, addLikes, removeBlog}) => {
	const [visible, setVisible] = useState(false)
	const loggedUser = localStorage.getItem('loggedBlogUser')
	const user = JSON.parse(JSON.stringify(loggedUser))

	const blogStyle = {
		padding: 5,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const hideWhenVisible = {display: visible ? 'none': ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const addLike = () => {
		const likes = blog.likes += 1
		const id = blog.id
		addLikes(id, {
			user: blog.user.id,
			likes: likes,
			author: blog.author,
			title: blog.title,
			url: blog.url
		})
	}

	const delBlog = () => {
		const message = `Remove blog ${blog.title} by ${blog.author}?`
		if (window.confirm(message)) {
			removeBlog(blog.id)
		}
	}

	return (
		<div style={blogStyle} id={blog.id}>
			<div style={hideWhenVisible}>
				<p>{blog.title} {blog.author}</p>
				<button onClick={toggleVisibility}>View</button>
			</div>
			<div style={showWhenVisible} className="togglableContent">
				<p>{blog.title} by {blog.author} </p>
				<button onClick={toggleVisibility}>Hide</button>
				<p>{blog.url}</p>
				<p>likes {blog.likes}</p>
				<button onClick={addLike}>Like</button>
				<p>{blog.user.name}</p>
				{user.username === blog.user.username ?
					<button onClick={delBlog}>Remove</button> : ''
				}
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired
}

export default Blog