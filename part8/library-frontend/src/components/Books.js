import React, { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

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
const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [getBooksByGenre, result] = useLazyQuery(FAVOURITE_BOOKS_BY_GENRE)
  const [favouriteBooks, setFavouriteBooks] = useState(!selectedGenre ? props.books : [])

  useEffect(() => {
    if (selectedGenre && !result.loading) {
      getBooksByGenre({ variables: { genre: selectedGenre } })
    }
  }, [selectedGenre, result.loading])


  useEffect(() => {
    if (result.data) {
      setFavouriteBooks(result.data.allBooks)
    }
  }, [setFavouriteBooks, result.data])

  const genres = [...new Set(props.books.map((book) => book.genres).flat())];
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button
            onClick={() => setSelectedGenre(genre)}
            style={{ margin: "auto 10px" }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
