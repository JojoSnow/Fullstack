import {createSlice} from '@reduxjs/toolkit'

const initialState = 'hello world'

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
})

export default notificationSlice.reducer