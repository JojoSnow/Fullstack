import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState,
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		addVote(state, action) {
			const id = action.payload
			const votedAnecdote = state.find(a => a.id === id)
			votedAnecdote.votes += 1
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const {createAnecdote, addVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer