import {useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {voteNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filtered = useSelector(state => state.filters)
	const dispatch = useDispatch()

	const vote = (id, content) => {
		dispatch(addVote(id))
		dispatch(voteNotification(content))
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
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
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
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
			</div>
		)
	}
}

export default AnecdoteList