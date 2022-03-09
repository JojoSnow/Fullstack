import React, {useState} from 'react'
import {Routes, Route, Link, Navigate, useMatch} from 'react-router-dom'
import styled from 'styled-components'

import Note from './components/Note'
import Notes from './components/Notes'
import Home from './components/Home'
import Users from './components/Users'
import Login from './components/Login'
import Footer from './components/Footer'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

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
		<Page>
			<Navigation>
				<Link style={padding} to="/">Home</Link>
				<Link style={padding} to="/notes">Notes</Link>
				<Link style={padding} to="/users">Users</Link>
				{user
				? <em>{user} logged in</em>
				: <Link style={padding} to="/login">Login</Link>
				}
			</Navigation>

			<Routes>
				<Route path="/notes/:id" element={<Note note={note} />} />
				<Route path="/notes" element={<Notes notes={notes} />} />   
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<Login onLogin={login} />} />
				<Route path="/" element={<Home />} />     
				</Routes>

			<Footer />
		</Page>
	)
}

export default App