import {useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

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
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label name="username">username:</Form.Label>
					<Form.Control type="text" name="username" />
					<Form.Label name="password">password:</Form.Label> 
					<Form.Control type ="password" name="password" />
					<Button variant="primary" type="submit">Login</Button>
				</Form.Group>
				
			</Form>
		</div>
	)
}

export default Login