import {useSelector, useDispatch} from 'react-redux'
import {plusVote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filtered = useSelector(state => state.filters)
	const dispatch = useDispatch()

	const vote = (anecdote) => {
		dispatch(plusVote(anecdote))
		dispatch(setNotification(`you voted '${anecdote.content}'`, 7))
	}

	if (filtered.length === 0) {
		return (
			<div>
			{anecdotes
				.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
			</div>
		)
	} else {
		return (
			<div>
			{filtered
				.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
			</div>
		)
	}
}

export default AnecdoteList