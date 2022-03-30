const {UserInputError, AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')

const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'needhereasecretkey'

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
		me: async (root, args, context) => {
			const user = await context.currentUser
			return user
		}
	},

	Book: {
		author: async (parent, root, args) => {
			let id
			if (typeof parent.author === 'object') {
				id = parent.author._id
			} else {
				id = parent.author
			}

			const author =  await Author.findOne({_id: id})
			return {
				name: author.name,
				born: author.born,
				bookCount: author.bookCount,
				id: id
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

			pubsub.publish('BOOK_ADDED', {bookAdded: book})

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
		findBookByGenre: async (root, args) => {
			if (args.genre) {
				const books = await Book.find({genres: {$in: args.genre}})
				return books
			} else {
				return null
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
				username: user.username,
				id: user._id
			}

			return {value: jwt.sign(userForToken, JWT_SECRET)}
		}
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}
}

module.exports = resolvers