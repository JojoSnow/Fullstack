import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Form, Button} from 'react-bootstrap'

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
		<Form className="mt-4" onSubmit={addBlog}>
			<h3 className="mb-3">Create New</h3>
			<Form.Group>
				<Form.Label htmlFor="Title">Title:</Form.Label>
				<Form.Control
					type="text"
					value={title}
					name="Title"
					id="title"
					onChange={({target}) => setTitle(target.value)}
				/>{' '}
				<Form.Label htmlFor="Author" className="pt-2">Author:</Form.Label>
				<Form.Control
					type="text"
					value={author}
					name="Author"
					id="author"
					onChange={({target}) => setAuthor(target.value)}
				/>{' '}
				<Form.Label htmlFor="Url" className="pt-2">Url:</Form.Label>
				<Form.Control
					type="text"
					value={url}
					name="Url"
					id="url"
					onChange={({target}) => setUrl(target.value)}
				/>{' '}
				<Button className="mt-3" variant="primary" type="submit" id="createBtns">
					Create
				</Button>
			</Form.Group>
		</Form>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
}

export default BlogForm
