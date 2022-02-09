import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';

const Notification = ({ message }) => {
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

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(changedNote).then(returnedNote => {
        setNotes(notes.map(notee => notee.id !== id ? notee : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const newUser = await loginService.login({username, password})

      window.localStorage.setItem(
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
  : notes.filter(note => note.important);

  const loginForm = () => {
    return (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input type="text" value={username} name="Username" 
          onChange= {({target}) => setUsername(target.value)} />
      </div>
      <div>
        password
          <input type="password" value={password} name="Password"
          onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>)
  }

  const noteForm = () => {
    return (
    <form onSubmit={addNote}>
      <input 
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>)
  }

  return (
    <div>
      <h1>Notes</h1>
      
      <Notification message={errorMessage} />

      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
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
  );
};

export default App;