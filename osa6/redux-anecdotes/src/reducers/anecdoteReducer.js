import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState,
	reducers: {
		addVote(state, action) {
			const id = action.payload
			const votedAnecdote = state.find(a => a.id === id)
			votedAnecdote.votes += 1
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const {addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export default anecdoteSlice.reducer