import {createAnecdote} from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'
import { anecdoteNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		dispatch(anecdoteNotification(content))
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