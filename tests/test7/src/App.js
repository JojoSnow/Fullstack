import React, {useState} from 'react'
import {Routes, Route, Link, Navigate, useMatch} from 'react-router-dom'
import {Container, AppBar, Toolbar, IconButton, Button} from '@material-ui/core'
import {Alert} from '@material-ui/lab'

import Note from './components/Note'
import Notes from './components/Notes'
import Home from './components/Home'
import Users from './components/Users'
import Login from './components/Login'
import Footer from './components/Footer'

const App = () => {
	const [notes, setNotes] = useState([
		{
			content: 'HTML is easy',
			important: true,
			user: 'Matti Luukkainen',
			id: 1
		},
		{
			content: 'Browser can execute only Javascript',
			imporant: false,
			user: 'Matti Luukkainen',
			id: 2
		},
		{
			content: 'Most important methods of HTTP-protocal are GET and POST',
			important: true,
			user: 'Matti Luukkainen',
			id: 3
		}
	])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	const login = (u) => {
		setUser(u)
		setMessage(`welcome ${u}`)
		setTimeout(() => {
			setMessage(null)
		}, 10000)
	}

	const padding = {
		padding: 5
	}

	const match = useMatch('/notes/:id')
	const note = match
		? notes.find(n => n.id === Number(match.params.id))
		: null

	return (
		<Container>
			{(message &&
				<Alert severity="success">
					{message}	
				</Alert>)}
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
						</IconButton>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit"  component={Link} to="/notes">
							Notes
						</Button>
						<Button color="inherit" component={Link} to="/users">
							Users
						</Button>  
						{user
							? 	<em>{user} logged in</em>
							: 	<Button color="inherit" component={Link} to="/login">
									Login
								</Button>
						}              
					</Toolbar>
				</AppBar>

			<Routes>
				<Route path="/notes/:id" element={<Note note={note} />} />
				<Route path="/notes" element={<Notes notes={notes} />} />
				<Route path="/users" element={user ? <Users /> : <Navigate replace to ="/login" />} />
				<Route path="/login" element={<Login onLogin={login} />} />
				<Route path="/" element={<Home />} />
			</Routes>

			<Footer />
		</Container>
	)
}

export default App