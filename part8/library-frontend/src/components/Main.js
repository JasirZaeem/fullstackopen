import { Authors } from "./Authors";
import { Books } from "./Books";
import { AddBook } from "./AddBook";
import { Login } from "./Login";
import { PAGES } from "../constants";
import { Recommended } from "./Recommended";

export const Main = ({ page, updateToken, updateCacheWith }) => {
  switch (page) {
    case PAGES.authors:
      return <Authors />;
    case PAGES.books:
      return <Books />;
    case PAGES.addBook:
      return <AddBook updateCacheWith={updateCacheWith} />;
    case PAGES.login:
      return <Login updateToken={updateToken} />;
    case PAGES.recommended:
      return <Recommended />;
    default:
      throw Error(`${page} not a valid page`);
  }
};
