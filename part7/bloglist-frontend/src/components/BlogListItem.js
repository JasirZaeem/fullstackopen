import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
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
    <div style={blogStyle} className={"blog"}>
      <Link to={`blogs/${blog.id}`}>
        <p style={pStyle}>
          {blog.title} by {blog.author}
        </p>
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
