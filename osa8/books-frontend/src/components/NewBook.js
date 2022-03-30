import { useState } from 'react'
import { useMutation } from '@apollo/client'

import {updateCache} from '../App'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS} from '../queries'

const NewBook = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	const [addBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{query: ALL_AUTHORS}],
		update: (cache, response) => {
			updateCache(cache, {query: ALL_BOOKS}, response.data.addBook)
		}
	})

	if (!props.show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()

		addBook({variables: {title, author, published, genres}})
		

		setTitle('')
		setPublished('')
		setAuthor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('')
	}

  return (
		<div>
			<h2>Add book</h2>
			<form onSubmit={submit}>
				<div>
					Title
					<input value={title} onChange={({ target }) => setTitle(target.value)} />
				</div>
				<div>
					Author
					<input value={author} onChange={({ target }) => setAuthor(target.value)} />
				</div>
				<div>
					Published
					<input type="number" value={published} onChange={({ target }) => setPublished(parseInt(target.value))} />
				</div>
				<div>
					<input value={genre} onChange={({ target }) => setGenre(target.value)} />
					<button onClick={addGenre} type="button"> Add Genre	</button>
				</div>
				<div>Genres: {genres.join(' ')}</div>
				<button type="submit">Create book</button>
			</form>
		</div>
  )
}

export default NewBook