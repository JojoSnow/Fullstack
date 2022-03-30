import {useQuery, useMutation} from "@apollo/client"
import { useEffect, useState } from "react"
import {FIND_BY_GENRE, CURRENT_USER} from "../queries"

const Recommend = (props) => {
	const user = useQuery(CURRENT_USER, {
		onError: (error) => {
			console.log(error.graphQLErrors[0].message)
		}
	})
	const [findBooksByGenre] = useMutation(FIND_BY_GENRE)
	
	const [genreBooks, setGenreBooks] = useState([])
	const [genre, setGenre] = useState('')
	
	let findBooks = []

	const token = localStorage.getItem('libraryUserToken')
	
	useEffect(() => {
		if (token  && user.data.me) {
			setGenre(user.data.me.favouriteGenre)
		}
	}, []) // eslint-disable-line

	if (!props.show) {
		return null
	}

	if (user.loading) {
		return <div>loading...</div>
	}

	if (token && user.data.me) {
		if (genre !== '' ) {
			(async () => {
				findBooks = await findBooksByGenre({variables: {genre: genre}})
				setGenreBooks(findBooks.data.findBookByGenre)
			})()
		}
	}

	return (
		<div>
			<h2>Recommendations</h2>
			<p>Books in your favourite genre <strong>patterns</strong></p>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>Author</th>
						<th>Published</th>
					</tr>
					{genre !== '' ? 
						genreBooks.map((b) => (
							<tr key={b.title}>
								<td>{b.title}</td>
								<td>{b.author.name}</td>
								<td>{b.published}</td>
							</tr>
						)) :	
						<tr>
							<td>No books found</td>
						</tr>
					}
				</tbody>
			</table>
		</div>
	)
}

export default Recommend