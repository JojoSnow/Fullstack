import {useSelector, useDispatch} from 'react-redux'
import {filterAnecdotes} from '../reducers/filterReducer'

const Filter = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()

	const handleChange = (event) => {
		const value = event.target.value
		const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(value.toLowerCase()))
		dispatch(filterAnecdotes(filtered))
	}
	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			filter
			<input onChange={handleChange} />
		</div>
	)
}

export default Filter