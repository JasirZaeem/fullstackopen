import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from "../queries";
import { useState } from "react";

const AuthorTable = ({ authors }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UpdateBirthYear = ({ authors }) => {
  const [author, setAuthor] = useState(authors[0]);
  const [year, setYear] = useState(author.born ?? "");

  const [addBook] = useMutation(SET_AUTHOR_BIRTHYEAR);

  const updateAuthor = async (e) => {
    e.preventDefault();

    await addBook({
      variables: { name: author.name, year: parseInt(year) },
    });
  };

  return (
    <div>
      <h1>Set Birthyear</h1>
      <form onSubmit={updateAuthor}>
        <label>
          Author:{" "}
          <select
            value={author.name}
            onChange={(e) =>
              setAuthor(
                authors.find((author) => {
                  setYear(author.born ?? "");
                  return author.name === e.target.value;
                })
              )
            }
          >
            {authors.map((author) => (
              <option key={author.id}>{author.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Year:{" "}
          <input
            type={"number"}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <br />
        <button>Update Birth Year</button>
      </form>
    </div>
  );
};

export const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  return (
    <div>
      <h1>Authors</h1>
      {result.loading ? (
        <div>Loading..</div>
      ) : !result.data.allAuthors || !!result.data.allAuthors.length ? (
        <>
          <AuthorTable authors={result.data.allAuthors} />
          <UpdateBirthYear authors={result.data.allAuthors} />
        </>
      ) : (
        <div>No authors</div>
      )}
    </div>
  );
};
