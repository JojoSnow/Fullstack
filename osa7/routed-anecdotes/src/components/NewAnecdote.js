import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useField} from '../hooks'

const NewAnecdote = ({create}) => {
	const {reset: resetContent, ...content} = useField('text')
	const {reset: resetAuthor, ...author} = useField('text')
	const {reset: resetInfo, ...info} = useField('text')
	let navigate = useNavigate()
	
	const reset = () => {
		resetContent()
		resetAuthor()
		resetInfo()
	}

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
			<form onSubmit={handleSubmit} onReset={reset} >
				<label htmlFor="content">Content</label>
				<input name="content" {...content} /><br />

				<label htmlFor="author">Author</label>
				<input name="author" {...author} /><br />

				<label htmlFor="info">Url for more info</label>
				<input name="info" {...info} /><br />

				<input type="submit" value="Submit" />
				<input type="reset" value="Reset" />
			</form>		
		</div>
	)
}

export default NewAnecdote