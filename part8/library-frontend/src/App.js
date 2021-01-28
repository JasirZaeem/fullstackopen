import { Main } from "./components/Main";
import { Nav } from "./components/Nav";
import { useState } from "react";
import { LIBRARY_USER_TOKEN, PAGES } from "./constants";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState(PAGES.authors);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateToken = (token) => {
    if (token === null) {
      window.localStorage.removeItem(LIBRARY_USER_TOKEN);
    } else {
      window.localStorage.setItem(LIBRARY_USER_TOKEN, token);
    }
    setToken(token);
  };

  const logout = () => {
    updateToken(null);
    setPage(PAGES.books);
    client.resetStore();
  };

  return (
    <div className="App">
      <Nav setPage={setPage} token={token} logout={logout} />
      <Main page={page} updateToken={updateToken} />
    </div>
  );
};

export default App;
