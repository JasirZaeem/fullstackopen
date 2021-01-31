import { Main } from "./components/Main";
import { Nav } from "./components/Nav";
import { useState } from "react";
import { LIBRARY_USER_TOKEN, PAGES } from "./constants";
import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState(PAGES.authors);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, obj) => set.some((b) => b.id === obj.id);

    const storedData = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(storedData.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: [...storedData.allBooks, addedBook] },
      });
      // Added
      return true;
    } else {
      // Not added
      return false;
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const {
        data: { bookAdded },
      } = subscriptionData;
      if (updateCacheWith(bookAdded)) {
        alert(`${bookAdded.title} by ${bookAdded.author.name} added`);
      }
    },
  });

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
      <Main
        page={page}
        updateToken={updateToken}
        updateCacheWith={updateCacheWith}
      />
    </div>
  );
};

export default App;
