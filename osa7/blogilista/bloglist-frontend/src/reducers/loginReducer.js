import {createSlice} from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
	name: 'loggedUser',
	initialState,
	reducers: {
		saveUser(state, action) {
			state = action.payload
			return state
		},
		delUser(state, action) {
			state = null
			return state
		}
	}
})

export const {saveUser, delUser} = userSlice.actions

export const loginUser = (username, password) => {
	return async dispatch => {
		const newUser = await loginService.login({username, password})
		await blogService.setToken(newUser.token)
		dispatch(saveUser(newUser))
	}
}

export const logoutUser = () => {
	return async dispatch => {
		dispatch(delUser())
	}
}

export default userSlice.reducer