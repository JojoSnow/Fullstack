import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author {
				name
				born
				bookCount
				id
			}
			published
			genres
			id
		}
	}
`

export const CURRENT_USER = gql `
	query {
		me {
			username
			favouriteGenre
			id
		}
	}
`

export const FIND_BY_GENRE = gql`
	mutation findBookByGenre ($genre: String!) {
		findBookByGenre (
			genre: $genre
		) {
			title
			author {
				name
				born
				bookCount
				id
			}
			published
			genres
			id
		}
	}
`

export const ADD_BOOK = gql`
	mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		) {
			title
			author {
				name
				born
				bookCount
				id
			}
			published
			id
			genres
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $born: Int!) {
		editAuthor(
			name: $name,
			born: $born
		) {
			name
			born
			id
			bookCount
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(
			username: $username, 
			password: $password
		) {
			value
		}
	}
`