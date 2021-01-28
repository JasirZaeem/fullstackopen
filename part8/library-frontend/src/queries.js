import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query AllBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      title
      author {
        name
        born
        id
      }
      genres
      published
      id
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
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
      title
      author {
        name
        born
        id
      }
      published
      genres
      id
    }
  }
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
      name
      born
      id
    }
  }
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
