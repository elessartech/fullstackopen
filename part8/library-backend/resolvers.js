const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      me: (root, args, context) => {
        return context.currentUser
      },
      allBooks: async (root, args) => {
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          return await Book.find({author: author._id}).populate('author')
        } 
        if (args.genre) {
          return await Book.find({genres: args.genre}).populate('author', {name: 1})
        } 
        return await Book.find({}).populate('author', { name: 1 })
      },
      allAuthors: async () => {
        const authors = await Author.find({})
        const books = await Book.find({})
        const updatedAuthors = [...authors].map((author) => {
          let bookCount = 0
          books.forEach((book) => {
            if (book.author._id.toString() == author._id.toString()) {
              bookCount += 1
            } 
          })
          author["bookCount"] = bookCount
          return author
        })
        return updatedAuthors
      }
     },
     Author: {
      name: (root) => root.name,
      bookCount: async (root) => {
       return await Book.find({author: book.author}).length
      }
     },
     Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        let isAuthorInSystem = await Author.findOne({name: args.author}) 
        if (!isAuthorInSystem) {
          let newAuthor = new Author({name: args.author, born: null})
          isAuthorInSystem = newAuthor
          try {
            await newAuthor.save()
          } catch(error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        let newBook = new Book({title: args.title, genres: args.genres, published: args.published, author: isAuthorInSystem})
        try {
          await newBook.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        } 
        pubsub.publish('NEW_BOOK', { newBook: newBook })
        return newBook
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        let author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        try {
          await author.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    },
    Subscription: {
      newBook: {
          subscribe: () => pubsub.asyncIterator(['NEW_BOOK'])
      },
  },
}

module.exports = resolvers