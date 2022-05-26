import React, {useState, useEffect} from 'react'

import { gql, useQuery, useLazyQuery } from "@apollo/client";

const ME = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;

const FAVOURITE_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }`

const Recommend = (props) => {
  const user = useQuery(ME);
  const [getBooksByGenre, result] = useLazyQuery(FAVOURITE_BOOKS_BY_GENRE)
  const [favouriteGenre, setFavouriteGenre] = useState(null)
  const [favouriteBooks, setFavouriteBooks] = useState([])
  

  useEffect(() => {
    if (user.data && !result.data) {
      getBooksByGenre({ variables: { genre: user.data.me.favouriteGenre } })
      setFavouriteGenre(user.data.me.favouriteGenre)
    }
  }, [getBooksByGenre, user])


  useEffect(() => {
    if (result.data) {
      setFavouriteBooks(result.data.allBooks)
    }
  }, [setFavouriteBooks, result.data])

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre: {favouriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {favouriteBooks
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <div>
      </div>
    </div>
  )
}

export default Recommend