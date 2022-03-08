import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useField} from '../hooks'

const NewAnecdote = ({create}) => {
	let navigate = useNavigate()
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

	const handleSubmit = (event) => {
		event.preventDefault()
		create({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})

		navigate('/')
	}

	return (
		<div>
			<h2>Create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="content">Content</label>
				<input name="content" {...content} /><br />

				<label htmlFor="author">Author</label>
				<input name="author" {...author} /><br />

				<label htmlFor="info">Url for more info</label>
				<input name="info" {...info} /><br />

				<button type="submit">Create</button>
			</form>		
		</div>
	)
}

export default NewAnecdote