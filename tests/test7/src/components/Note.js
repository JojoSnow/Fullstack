const Note = ({note}) => (
	<div>
		<h2>{note.content}</h2>
		<div>{note.user}</div>
		<div><strong>{note.important ? 'Important' : ''}</strong></div>
	</div>
)

export default Note