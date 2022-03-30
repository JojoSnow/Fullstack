const {gql} = require('apollo-server')

const typeDefs = gql`
	type Book {
		title: String!
		author: Author!
		published: Int!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int!
		id: ID!
	}	

	type User {
		username: String!
		favouriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks: [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String]!
		): Book!
		addAuthor(
			name: String!
			born: Int
			bookCount: Int!
		): Author!
		editAuthor(
			name: String!
			born: Int!
		): Author
		findBookByGenre(
			genre: String!
		): [Book!]!
		createUser(
			username: String!
			favouriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}

	type Subscription {
		bookAdded: Book!
	}
`

module.exports = typeDefs