import {createSlice} from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
		setUser(state, action) {
			return action.payload
		},
	},
})

export const {setUsers, setUser} = userSlice.actions

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch(setUsers(users))
	}
}

export const getUser = id => {
	return async dispatch => {
		const user = await userService.getUser(id)
		dispatch(setUser(user))
	}
}

export default userSlice.reducer
