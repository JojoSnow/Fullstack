const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'needhereasecretkey'

const MONGODB_URI = 'mongodb+srv://fullstack:isthisyou123@cluster0.ctlkm.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log(('error connection to MongoDB: ', error.message))
	})

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
		createUser(
			username: String!
			favouriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
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
		},
		me: (root, args, context) => {
			return context.currentUser
		}
	},

	Book: {
		author: async (parent, root, args) => {
			const author =  await Author.findOne({_id: parent.author})
			return {
				name: author.name,
				born: author.born,
				bookCount: author.bookCount,
				id: parent.author
			}
		}
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const findAuthor = await Author.findOne({name: args.author})
			const currentUser = context.currentUser

			if(!currentUser) {
				throw new AuthenticationError('not authenticated')
			}			
			
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
		editAuthor: async (root, args, context) => {
			const author = await Author.findOne({name: args.name})
			const currentUser = context.currentUser

			if(!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			if(!author) {
				return null
			}
			try {
				await Author.updateOne(
					{name: {$in: args.name}},
					{$set: {born: args.born}}
				)
				
				return await Author.findOne({name: args.name})
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}	
		},
		createUser: async (root, args) => {
			const user = new User({...args})

			try {
				await user.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}

			return user
		},
		login: async (root, args) => {
			const user = await User.findOne({username: args.username})

			if(!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials')
			}

			const userForToken = {
				usernamne: user.username,
				id: user._id
			}

			return {value: jwt.sign(userForToken, JWT_SECRET)}
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({req}) => {
		const auth = req ? req.headers.authorization : null
		if(auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7), JWT_SECRET
			)
			const currentUser = await User
				.findById(decodedToken.id)
			return {currentUser}
		}
	}
})

server.listen().then(({url}) => {
	console.log(`Server ready at ${url}`)
})