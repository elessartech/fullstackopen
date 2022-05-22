const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://test:test@bloglisttest.mn5ka.mongodb.net/GraphQL?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
   }
  
   type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author]!
   }
  
   type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
   }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let booksToReturn = Book.find({})
      if (args.author) booksToReturn = Book.find({author: args.author})
      if (args.genre) booksToReturn = Book.find({genres: [].includes(args.genre)})
      return booksToReturn
    },
    allAuthors: () => Author.find({})
   },
   Author: {
    name: (root) => root.name,
    bookCount: (root) => {
     return Book.find({author: book.author}).length
    }
   },
   Mutation: {
    addBook: (root, args) => {
      const isAuthorInSystem = Author.findOne({name: args.author}) 
      const newBook = new Book({ ...args })
      if (!isAuthorInSystem) {
        const newAuthor = {name: args.author}
        newAuthor.save()
      }
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
 })
 
 server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
 })