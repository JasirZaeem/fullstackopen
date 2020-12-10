import { useState } from "react";

const CreateBlog = ({ addBlogHandler }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    addBlogHandler({ title, author, url });
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={formSubmitHandler}>
        title:
        <input
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        author:
        <input
          type={"text"}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        url:
        <input
          type={"url"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type={"submit"}>create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
