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

// Author.insertMany([
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
// 	}
// ])

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

// Book.insertMany([
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
// ])

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
		): Author!
		editAuthor(
			name: String!
			born: Int!
		): Author
	}
`

const addAuthor = async (args) => {
	const author = await new Author({name: args.author, bookCount: 1})
	try {
		await author.save()
	} catch (error) {
		throw new UserInputError(error.message, {
			invalidArgs: args.author
		})
	}
}

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),	
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async () => {
			return Book.find({})
		},
		allAuthors: async () => {
			return Author.find({})
		}
	},

	Mutation: {
		addBook: async (root, args) => {
			const findAuthor = await Author.findOne({name: args.author})
			
			
			if(!findAuthor) {
				await addAuthor(args)
			} else {
				const author1 = await Author.findOne({name: args.author})
				const bookCount = author1.bookCount + 1
				await Author.updateOne(
					{name: {$in: args.author}},
					{$set: {bookCount: bookCount}}
				)
			}

			const author = await Author.findOne({name: args.author})
			const book = await new Book({...args, author: author})

			try {
				await book.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args.title
				})
			}
			return book
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({name: args.name})
			
			if(!author) {
				return null
			}
			try {
				await Author.updateOne(
					{name: {$in: args.name}},
					{$set: {born: args.born}}
				)
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
			
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