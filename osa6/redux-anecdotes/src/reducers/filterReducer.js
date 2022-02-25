import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filterAnecdotes(state = initialState, action) {
			return action.payload
		}
	}
})

export const {filterAnecdotes} = filterSlice.actions
export default filterSlice.reducer