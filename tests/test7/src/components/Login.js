import {useNavigate} from 'react-router-dom'
import {
	TextField,
	Button
  } from '@material-ui/core'

const Login = (props) => {
	const navigate = useNavigate()

	const onSubmit = (event) => {
		event.preventDefault()
		props.onLogin('mluukkai')
		navigate('/')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
			<div>
				<TextField label="username" />
			</div>
			<div>
				<TextField  label="password" type='password' />
			</div>
			<div>
				<Button variant="contained" color="primary" type="submit">
				Login
				</Button>
			</div>
		</form>
		</div>
	)
}

export default Login