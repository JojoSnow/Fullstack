import {useQuery, useMutation} from '@apollo/client'
import {useState} from 'react'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const Authors = (props) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{query: ALL_AUTHORS}]
	})

	const result = useQuery(ALL_AUTHORS)

	if (!props.show) {
		return null
	}

	// console.log(result.data.allAuthors)
	const authors = result.data.allAuthors

	const submit  = (event) => {
		event.preventDefault()

		editAuthor({variables: {name, born}})

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h2>Authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
			  			<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
			  			</tr>
					))}
		  		</tbody>
			</table>
			<h3>Set birthyear</h3>
			<form onSubmit={(submit)}>
				<label htmlFor="name">Name</label>
				<input name="name" value={name} onChange={({ target }) => setName(target.value)}/><br />
				<label htmlFor="born">Born</label>
				<input name="born" value={born} onChange={({ target }) => setBorn(parseInt(target.value))}/><br />
				<button type="submit">Update author</button>
			</form>
	  </div>
	)
  }
  
  export default Authors