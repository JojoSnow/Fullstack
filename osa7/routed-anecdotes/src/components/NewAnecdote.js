import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const NewAnecdote = ({create}) => {
	const [content, setContent] = useState('')
	const [author, setAuthor] = useState('')
	const [info, setInfo] = useState ('')
	let navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		create({
			content,
			author,
			info,
			votes: 0
		})

		setContent('')
		setAuthor('')
		setInfo('')
		navigate('/')
	}

	return (
		<div>
			<h2>Create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="content">Content</label>
				<input name="content" value={content} onChange={(e) => setContent(e.target.value)} /><br />

				<label htmlFor="author">Author</label>
				<input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} /><br />

				<label htmlFor="url">Url for more info</label>
				<input name="url" value={info} onChange={(e) => setInfo(e.target.value)} /><br />

				<button type="submit">Create</button>
			</form>		
		</div>
	)
}

export default NewAnecdote