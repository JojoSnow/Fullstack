import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

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
		const clock = time * 1000
		dispatch(makeNotification(content))
		setTimeout(() => {
			dispatch(clearNotification())
		}, clock)
	}
}

export default notificationSlice.reducer