import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../reducers/loginReducer'
import {Form, Button} from 'react-bootstrap'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleLogin = async event => {
		event.preventDefault()
		dispatch(loginUser(username, password))
	}

	return (
		<Form id="loginForm" className="mt-2" onSubmit={handleLogin}>
			<h2 className="my-4">Log In To Application</h2>
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					value={username}
					name="Username"
					id="username"
					onChange={({target}) => setUsername(target.value)}
				/>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					value={password}
					name="Password"
					id="password"
					onChange={({target}) => setPassword(target.value)}
				/>
				<Button variant="primary" className="mt-3" type="submit" id="loginBtn">
					Login
				</Button>
			</Form.Group>
		</Form>
	)
}

export default LoginForm
