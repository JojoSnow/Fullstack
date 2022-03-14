import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../reducers/loginReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleLogin = async event => {
		event.preventDefault()
		dispatch(loginUser(username, password))
	}

	return (
		<form id="loginForm" onSubmit={handleLogin}>
			<h2>log in to application</h2>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					id="username"
					onChange={({target}) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					id="password"
					onChange={({target}) => setPassword(target.value)}
				/>
			</div>
			<button type="submit" id="loginBtn">
				Login
			</button>
		</form>
	)
}

export default LoginForm
