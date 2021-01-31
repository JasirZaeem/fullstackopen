import { gql } from "@apollo/client";

const AUTHOR_DETAILS_FRAGMENT = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

const BOOK_DETAILS_FRAGMENT = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      ...AuthorDetails
    }
    genres
    id
  }

  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const ALL_BOOKS = gql`
  query AllBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const SET_AUTHOR_BIRTHYEAR = gql`
  mutation setAuthorBirthyear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const ME = gql`
  query {
    me {
      id
      username
      favouriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`;
