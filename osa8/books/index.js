const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')

const MONGODB_URI = 'mongodb+srv://fullstack:isthisyou123@cluster0.ctlkm.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log(('error connection to MongoDB: ', error.message))
	})

// let authors = [
// 	{
// 		name: 'Robert Martin',
//     	id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     	born: 1952,
// 	},
// 	{
// 		name: 'Martin Fowler',
//     	id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     	born: 1963
// 	},
// 	{
// 		name: 'Fyodor Dostoevsky',
//     	id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     	born: 1821
// 	},
// 	{
// 		name: 'Joshua Kerievsky', // birthyear not known
//     	id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
// 	},
// 	{
// 		name: 'Sandi Metz', // birthyear not known
//     	id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
// 	}
// ]

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

// let books = [
// 	{
// 		title: 'Clean Code',
// 		published: 2008,
// 		author: 'Robert Martin',
// 		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
// 		genres: ['refactoring']
// 	},
// 	{
// 		title: 'Agile software development',
// 		published: 2002,
// 		author: 'Robert Martin',
// 		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
// 		genres: ['agile', 'patterns', 'design']
// 	},
// 	{
// 		title: 'Refactoring, edition 2',
// 		published: 2018,
// 		author: 'Martin Fowler',
// 		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
// 		genres: ['refactoring']
// 	},
// 	{
// 		title: 'Refactoring to patterns',
// 		published: 2008,
// 		author: 'Joshua Kerievsky',
// 		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
// 		genres: ['refactoring', 'patterns']
// 	},  
// 	{
// 		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
// 		published: 2012,
// 		author: 'Sandi Metz',
// 		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
// 		genres: ['refactoring', 'design']
// 	},
// 	{
// 		title: 'Crime and punishment',
// 		published: 1866,
// 		author: 'Fyodor Dostoevsky',
// 		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
// 		genres: ['classic', 'crime']
// 	},
// 	{
// 		title: 'The Demon ',
// 		published: 1872,
// 		author: 'Fyodor Dostoevsky',
// 		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
// 		genres: ['classic', 'revolution']
// 	}
// ]

const typeDefs = gql`
	type Book {
		title: String!
		author: String!
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

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks: [Book!]!
		allAuthors: [Author!]!
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
		): Author
		editAuthor(
			name: String!
			born: Int!
		): Author
	}
`

const addAuthor = async (args) => {
	const author = new Author({name: args.author, born: null, bookCount: 1})
	await author.save()
}

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		// allBooks: (root, args) => {
		// 	if (args.author && args.genre) {
		// 		let authorGenreBooks = []
		// 		books.map(book => {
		// 			if(book.author === args.author && book.genres.includes(args.genre)) {
		// 				authorGenreBooks.push(book)
		// 			}
		// 		})
		// 		return authorGenreBooks
		// 	}

		// 	if (args.author) {
		// 		let authorBooks = []
		// 		books.map(book => book.author === args.author ? authorBooks.push(book) : book)
		// 		return authorBooks
		// 	}

		// 	if (args.genre) {
		// 		let genreBooks = []
		// 		books.map(book => {
		// 			book.genres.map(genre => genre === args.genre ? genreBooks.push(book) : genre)
		// 		})
		// 		return genreBooks
		// 	}
			
		// },
		allBooks: async () => {
			return Book.find({})
		},
		allAuthors: async () => {
			return Author.find({})
		}
	},

	Author: {
		bookCount: (root, args) => {
			// let authorBooks = []
			// books.map(book => {
			// 	if(book.author === root.name) {
			// 		authorBooks.push(book)
			// 	}	
			// })
			return 1
		}
	},

	Mutation: {
		addBook: async (root, args) => {
			const book = new Book({...args})

			try {
				const findAuthor = await Author.findOne({name: args.author})
				
				if(!findAuthor) {
					addAuthor(args)
				}
				
				await book.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
			return book
		},
		editAuthor: (root, args) => {
			const author = authors.find(a => a.name === args.name)
			if(!author) {
				return null
			}
			const updatedAuthor = {...author, born: args.born}
			authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
			return updatedAuthor
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(({url}) => {
	console.log(`Server ready at ${url}`)
})