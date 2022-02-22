import {createAnecdote} from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
	}

	return (
		<form onSubmit={addAnecdote}>
			<h2>create new</h2>
			<input name="anecdote" />
			<button type="submit">create</button>
		</form>
	)
}

export default AnecdoteForm