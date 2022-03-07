import {createSlice} from '@reduxjs/toolkit'

const initialState = ''
let timeoutID = null

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		clearNotification(state, action) {
			state = ''
			return state
		},
		makeNotification(state, action) {
			state = action.payload
			return state
		}
	}
})

export const {clearNotification, makeNotification} = notificationSlice.actions


export const setNotification = (content, time) => {
	return async dispatch => {
		dispatch(makeNotification(content))
		if (timeoutID) {
			clearTimeout(timeoutID)
		}
		timeoutID = setTimeout(() => {
			dispatch(clearNotification())
		}, time * 1000)
	}
}

export default notificationSlice.reducer