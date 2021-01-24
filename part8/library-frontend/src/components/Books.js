import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const BookTable = ({ books }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Books = () => {
  const result = useQuery(ALL_BOOKS);

  return (
    <div>
      <h1>Books</h1>
      {result.loading ? (
        <div>Loading..</div>
      ) : (
        <BookTable books={result.data.allBooks} />
      )}
    </div>
  );
};
