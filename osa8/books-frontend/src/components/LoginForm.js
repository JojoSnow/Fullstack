import {useState, useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../queries'

const LoginForm = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			console.log(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if(result.data) {
			const token = result.data.login.value
			props.setToken(token)
			localStorage.setItem('libraryUserToken', token)
		}
	}, [result.data]) //eslint-disable-line

	if (!props.show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()

		await login({variables: {username, password}})
		
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={submit}>
				<label htmlFor="username">Username</label>
				<input name="username" value={username} onChange={({target}) => setUsername(target.value)} /><br/>
				<label htmlFor="password">Password</label>
				<input name="password" type="password" value={password} onChange={({target}) => setPassword(target.value)} /><br/>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default LoginForm