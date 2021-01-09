import React, { useState } from "react";
import PropTypes from "prop-types";

const CreateBlog = ({ addNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    addNewBlog({ title, author, url });
  };

  return (
    <div className={"card m-2 shadow"}>
      <div className={"card-header"}>
        <h2 className={"card-title"}>Create new</h2>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={"card-body"}>
          title:
          <input
            id={"new-title-input"}
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          author:
          <input
            id={"new-author-input"}
            type={"text"}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <br />
          url:
          <input
            id={"new-url-input"}
            type={"url"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className={"card-footer"}>
          <button id={"create-new-blog-btn"} type={"submit"}>
            create
          </button>
        </div>
      </form>
    </div>
  );
};

CreateBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
};

export default CreateBlog;
