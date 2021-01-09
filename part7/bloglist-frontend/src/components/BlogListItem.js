import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog }) => {
  const hStyle = {
    textDecoration: "none!important",
  };

  return (
    <div
      className={"card mx-2 my-4 p-0 shadow-sm bg-light text-decoration-none"}
    >
      <Link to={`blogs/${blog.id}`}>
        <div className="card-body ">
          <h3 style={hStyle} className={"card-title text-dark"}>{blog.title}</h3>
          by {blog.author}
        </div>
      </Link>
    </div>
  );
};

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogListItem;
