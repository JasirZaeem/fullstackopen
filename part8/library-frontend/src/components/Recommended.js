import { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { BookTable } from "./BookTable";

export const Recommended = () => {
  const { loading: meLoading, data: me } = useQuery(ME, {
    fetchPolicy: "no-cache",
  });

  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (me?.me) {
      getBooks({ variables: { genre: me.me.favouriteGenre } });
    }
  }, [me, getBooks]);

  return meLoading || loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Recommended Books</h1>
      {me?.me && data?.allBooks ? (
        <>
          <p>
            Books from your favourite genre,{" "}
            <strong>{me.me.favouriteGenre}:</strong>
          </p>
          <BookTable books={data.allBooks} />{" "}
        </>
      ) : null}
    </div>
  );
};
