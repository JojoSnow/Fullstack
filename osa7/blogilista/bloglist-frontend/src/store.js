import {configureStore} from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		loggedUser: loginReducer
	}
})

export default store