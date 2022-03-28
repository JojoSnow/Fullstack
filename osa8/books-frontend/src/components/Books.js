import {useMutation, useQuery} from "@apollo/client"
import { useState } from "react"
import {ALL_BOOKS, FIND_BY_GENRE} from "../queries"

const Books = (props) => {
	const result = useQuery(ALL_BOOKS)
	const [findBooksByGenre] = useMutation(FIND_BY_GENRE)
	const [genre, setGenre] = useState('')
	const [booksOfGenre, setGenreBooks] = useState('')
	let findBooks = []
	const genres = []

	if (!props.show) {
		return null
	}
  
	const books = result.data.allBooks
	
	books.map((b) => (
		b.genres.map((g) => (
			genres.includes(g) === false ? genres.push(g) : g
		))
	))

	if (genre !== '') {
		(async () => {
			findBooks = await findBooksByGenre({variables: {genre: genre}})
			setGenreBooks(findBooks.data.findBookByGenre)
		})()
	} 

	return (
		<div>
			<h2>Books</h2>
			<p>In genre <strong>patterns</strong></p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{genre === '' ? 
						books.map((b) => (
							<tr key={b.title}>
								<td>{b.title}</td>
								<td>{b.author.name}</td>
								<td>{b.published}</td>
							</tr>
						)) :					
						booksOfGenre.map((b) => (
							<tr key={b.title}>
								<td>{b.title}</td>
								<td>{b.author.name}</td>
								<td>{b.published}</td>
							</tr>
						))
					}
				</tbody>
			</table>
			<div>
			{genres.map((g) => (
				<button key={g} onClick={() => setGenre(g)}>{g}</button>
			))}
			<button onClick={() => setGenre('')}>All genres</button>
			</div>
		</div>
	)
  }
  
  export default Books