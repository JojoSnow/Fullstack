import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		voteNotification(state, action) {
			state = `you voted '${action.payload}'`
			return state		
		},
		anecdoteNotification(state, action) {
			state = `'${action.payload}' was created`
			return state
		}
	}
})

export const {voteNotification, anecdoteNotification} = notificationSlice.actions
export default notificationSlice.reducer