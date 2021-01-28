import { PAGES } from "../constants";

export const Nav = ({ setPage, token, logout }) => {
  return (
    <div>
      <button onClick={() => setPage(PAGES.authors)}>Authors</button>
      <button onClick={() => setPage(PAGES.books)}>Books</button>
      {token ? (
        <>
          <button onClick={() => setPage(PAGES.recommended)}>Recommended</button>
          <button onClick={() => setPage(PAGES.addBook)}>Add Book</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => setPage(PAGES.login)}>Login</button>
      )}
    </div>
  );
};
