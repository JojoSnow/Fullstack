import React, {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = event => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url,
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<h2>create new</h2>
			<label htmlFor="Title">Title:</label>
			<input
				type="text"
				value={title}
				name="Title"
				id="title"
				onChange={({target}) => setTitle(target.value)}
			/>{' '}
			<br />
			<label htmlFor="Author">Author:</label>
			<input
				type="text"
				value={author}
				name="Author"
				id="author"
				onChange={({target}) => setAuthor(target.value)}
			/>{' '}
			<br />
			<label htmlFor="Url">Url:</label>
			<input
				type="text"
				value={url}
				name="Url"
				id="url"
				onChange={({target}) => setUrl(target.value)}
			/>{' '}
			<br />
			<button type="submit" id="createBtns">
				Create
			</button>
		</form>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
}

export default BlogForm
