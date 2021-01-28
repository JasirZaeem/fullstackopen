import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";
import { BookTable } from "./BookTable";

const BookFilter = ({ genres, setFilterGenre }) => {
  return (
    <div>
      {genres.map((genre) => (
        <button onClick={() => setFilterGenre(genre)} key={genre}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export const Books = () => {
  const [genres, setGenres] = useState(new Set());
  const [filterGenre, setFilterGenre] = useState("");

  const { data, loading } = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (data?.allBooks) {
      setGenres(new Set(data.allBooks.flatMap((book) => book.genres)));
    }
  }, [data]);

  return (
    <div>
      <h1>Books</h1>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <div>
          {filterGenre ? (
            <p>
              Showing books with the genre <strong>{filterGenre}</strong>
            </p>
          ) : null}

          <BookTable
            books={
              filterGenre
                ? data.allBooks.filter((book) =>
                    book.genres.includes(filterGenre)
                  )
                : data.allBooks
            }
          />
          <BookFilter genres={[...genres]} setFilterGenre={setFilterGenre} />
        </div>
      )}
    </div>
  );
};
