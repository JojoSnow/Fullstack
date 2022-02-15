import {useState} from 'react'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<h2>create new</h2>
			
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
}

export default BlogForm