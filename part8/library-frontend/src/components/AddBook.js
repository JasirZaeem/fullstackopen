import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";

export const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState([]);
  const [genreInputValue, setGenreInputValue] = useState("");

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const submitBook = async (e) => {
    e.preventDefault();
    await addBook({
      variables: { title, author, published, genres },
    });
    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
  };

  const addGenre = () => {
    if (
      !genreInputValue.trim() ||
      genres.some(
        (genre) => genre.toLowerCase() === genreInputValue.trim().toLowerCase()
      )
    )
      return;
    setGenres((prevGenres) => [...prevGenres, genreInputValue.trim()]);
    setGenreInputValue("");
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={submitBook}>
        <label>
          Title:{" "}
          <input onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <br />
        <label>
          Author:{" "}
          <input onChange={(e) => setAuthor(e.target.value)} value={author} />
        </label>
        <br />
        <label>
          Published:{" "}
          <input
            type={"number"}
            onChange={(e) => setPublished(parseInt(e.target.value))}
            value={published}
          />
        </label>
        <br />
        <label>
          Add genre:{" "}
          <input
            onChange={(e) => setGenreInputValue(e.target.value)}
            value={genreInputValue}
          />
        </label>
        <button type={"button"} onClick={addGenre}>
          Add Genre
        </button>
        {genres.length ? <p>Genres: {genres.join(", ")}</p> : null}
        <br />
        <button type={"submit"}>Add Book</button>
      </form>
    </div>
  );
};
