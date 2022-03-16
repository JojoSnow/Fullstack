import {configureStore} from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		users: userReducer,
		loggedUser: loginReducer,
	},
})

export default store
