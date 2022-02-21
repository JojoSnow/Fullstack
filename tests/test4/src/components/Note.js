import React from 'react'

const Note = ({note, toggleImportance}) => {
	const label = note.important === true
		? 'make not important' : 'make important'

	return (
		<li key={note.id} className='note'>
			<span>{note.content}</span>
			<button onClick={toggleImportance}>{label}</button>
		</li>
	)
}

export default Note