import { PAGES } from "../constants";

export const Nav = ({ setPage }) => {
  return (
    <div>
      <button onClick={() => setPage(PAGES.authors)}>authors</button>
      <button onClick={() => setPage(PAGES.books)}>books</button>
      <button onClick={() => setPage(PAGES.addBook)}>add book</button>
    </div>
  );
};
