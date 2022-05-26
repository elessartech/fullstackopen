import React, { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
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
          {props.books
            .filter((book) =>
              selectedGenre ? book.genres.includes(selectedGenre) : 1
            )
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
