import { Authors } from "./Authors";
import { Books } from "./Books";
import { AddBook } from "./AddBook";
import { PAGES } from "../constants";

export const Main = ({ page }) => {
  switch (page) {
    case PAGES.authors:
      return <Authors />;
    case PAGES.books:
      return <Books />;
    case PAGES.addBook:
      return <AddBook />;
    default:
      throw Error(`${page} not a valid page`);
  }
};
