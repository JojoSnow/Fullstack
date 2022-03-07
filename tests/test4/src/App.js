import React, {useState, useEffect, useRef} from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

const Notification = ({message}) => {
	if (message === null) {
		return null
	}

	return (
		<div className="error">
			{message}
		</div>
	)
}

const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16
	}

	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2021</em>
		</div>
	)
}

const Home = () => {
	<div> <h2>TKTL notes app</h2> </div>
}

const Notes = () => {
	<div> <h2>Notes</h2> </div>
}

const Users = () => {
	<div> <h2>Users</h2> </div>
}

const App = () => {
	const [page, setPage] = useState('home')
	const [loginVisible, setLoginVisible] = useState(false)
	const [notes, setNotes] = useState([])
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const noteFormRef = useRef()

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('loggedNoteAppUser')

		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON)
			setUser(loggedUser)
			noteService.setToken(loggedUser.token)
		}
	}, [])

	const toPage = (page) => (event) => {
		event.preventDefault()
		setPage(page)
	}

	const content = () => {
		if (page === 'home') {
			return <Home />
		} else if (page === 'notes') {
			return <Notes />
		} else if (page === 'users') {
			return <Users />
		}
	}

	const padding = {
		padding: 5
	}

	const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility()

		noteService
			.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
			})
	}

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id)
		const changedNote = {...note, important: !note.important}

		noteService
			.update(changedNote.id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(n => n.id !== id ? n : returnedNote))
			})
			.catch(() => {
				setErrorMessage(
					'Notes importance was changed'
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const newUser = await loginService.login({username, password})

			localStorage.setItem(
				'loggedNoteappUser', JSON.stringify(newUser)
			)

			noteService.setToken(newUser.token)
			setUser(newUser)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
		}
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)

	const loginForm = () => {
		const hideWhenVisible = {display: loginVisible ? 'none': ''}
		const showWhenVisible = {display: loginVisible ? '' : 'none'}

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>Login</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm
						username = {username}
						password = {password}
						handleUsernameChange = {({target}) => setUsername(target.value)}
						handlePasswordChange = {({target}) => setPassword(target.value)}
						handleSubmit = {handleLogin}
					/>
					<button onClick={() => setLoginVisible(false)}>Cancel</button>
				</div>
			</div>
		)
	}

	return (
		<div>
			<h1>Notes</h1>

			<Notification message={errorMessage} />

			{user === null ?
				loginForm() :
				<div>
					<p>{user.name} logged in</p>

					<Togglable buttonLabel="new note" ref={noteFormRef}>
						<NoteForm createNote={addNote} />
					</Togglable>
				</div>
			}
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all' }
				</button>
			</div>

			<ul>
				{notesToShow.map(note =>
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>

			<Footer />
		</div>
	)
}

export default App