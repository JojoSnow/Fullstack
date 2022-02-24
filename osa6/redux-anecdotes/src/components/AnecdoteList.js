import {useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {voteNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()

	const vote = (id, content) => {
		dispatch(addVote(id))
		dispatch(voteNotification(content))
	}

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
}

export default AnecdoteList