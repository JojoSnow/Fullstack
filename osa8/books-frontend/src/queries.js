import {gql} from '@apollo/client'

const AUTHOR_DETAILS = gql`
	fragment AuthorDetails on Author {
		name
		born
		id
		bookCount
	}
`

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			...AuthorDetails
		}
		published
		genres
		id
	}
${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			...AuthorDetails
		}
	}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
${BOOK_DETAILS}
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
			...BookDetails
		}
	}
${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
	mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		) {
			...BookDetails
		}
	}
${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $born: Int!) {
		editAuthor(
			name: $name,
			born: $born
		) {
			...AuthorDetails
		}
	}
${AUTHOR_DETAILS}
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

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
${BOOK_DETAILS}
`