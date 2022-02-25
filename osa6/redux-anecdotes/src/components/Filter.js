import {connect} from 'react-redux'
import {filterAnecdotes} from '../reducers/filterReducer'

const Filter = (props) => {
	const handleChange = (event) => {
		const value = event.target.value
		const filtered = props.anecdotes.filter(a => a.content.toLowerCase().includes(value.toLowerCase()))
		props.filterAnecdotes(filtered)
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes
	}
}

const mapDispatchToProps = {
	filterAnecdotes
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filter)