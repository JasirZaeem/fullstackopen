import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({
  blog,
  likeBlogHandler,
  isCreatedByUser,
  deleteBlogHandler,
}) => {
  const [detailVisible, setDetailVisible] = useState(false);

  const blogStyle = {
    padding: "10px",
    border: "solid",
    borderWidth: 2,
    margin: "2px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const pStyle = {
    display: "inline-block",
    margin: "0px",
  };

  return (
    <div style={blogStyle}>
      <p style={pStyle}>
        {blog.title} by {blog.author}
        {detailVisible ? (
          <>
            <br />
            {blog.url}
            <br />
            likes {blog.likes}
            <button
              onClick={() => {
                likeBlogHandler(blog);
              }}
            >
              like
            </button>
            <br />
            {blog.user.name}
            <br />
            {isCreatedByUser ? (
              <button onClick={() => deleteBlogHandler(blog)}>remove</button>
            ) : null}
          </>
        ) : null}
      </p>

      <button
        onClick={() => {
          setDetailVisible(!detailVisible);
        }}
      >
        {detailVisible ? "hide" : "view"}
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlogHandler: PropTypes.func.isRequired,
  isCreatedByUser: PropTypes.bool.isRequired,
  deleteBlogHandler: PropTypes.func,
};

export default Blog;
