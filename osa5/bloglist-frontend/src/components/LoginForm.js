import React, {useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({login}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const newUser = await loginService.login({username, password})

			localStorage.setItem(
				'loggedBlogUser', JSON.stringify(newUser)
			)

			blogService.setToken(newUser.token)
			login(newUser)
			setUsername('')
			setPassword('')
		} catch (exception) {
			console.log('wrong credentials')
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<h2>log in to application</h2>
			<div>
				username
				<input type="text" value={username} name="Username"	onChange={({target}) => setUsername(target.value)} />
			</div>
			<div>
				password
				<input type="password" value={password} name="Password"	onChange={({target}) => setPassword(target.value)} />
			</div>
			<button type="submit" id="loginBtn">Login</button>
		</form>
	)
}

export default LoginForm