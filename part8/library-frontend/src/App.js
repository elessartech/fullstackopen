import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { gql, useQuery, useApolloClient } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login")
  };


  if (!token) {
    return (
      <div>
       <Login show={page === "login"} setToken={(t) => setToken(t)} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} />

      <Books show={page === "books"} books={books.data.allBooks} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
