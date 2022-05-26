import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const UPDATE_AUTHOR = gql`
  mutation updateBook($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [name, setName] = useState(props.authors[0].name);
  const [born, setBorn] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  if (!props.show) {
    return null;
  }

  const handleSelectAuthorName = ({ target }) => {
    setName(target.value);
  };

  const submit = async (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={(event) => handleSelectAuthorName(event)}
          >
            {props.authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
