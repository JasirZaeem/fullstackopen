import blogService from "../services/blogs";

const ADD_BLOG = "ADD_BLOG";
const LIKE_BLOG = "LIKE_BLOG";
const DELETE_BLOG = "DELETE_BLOG";
const INITIALIZE_BLOGS = "INITIALIZE_BLOGS";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_BLOGS:
      return action.blogs;
    case LIKE_BLOG:
      return state.map((blog) =>
        blog.id === action.blog.id ? action.blog : blog
      );
    case ADD_BLOG:
      return [...state, action.blog];
    case DELETE_BLOG:
      return state.filter((blog) => blog.id !== action.id);
    default:
      return state;
  }
};

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.likeBlog(blog, getState().user.token);
    dispatch({
      type: LIKE_BLOG,
      blog: updatedBlog,
    });
    return updatedBlog;
  };
};

export const addBlog = (content) => {
  return async (dispatch, getState) => {
    const { name, username, token } = getState().user;
    const newBlog = await blogService.addBlog(content, token);
    newBlog.user = { username, name, id: newBlog.user };
    dispatch({
      type: ADD_BLOG,
      blog: newBlog,
    });
    return newBlog;
  };
};

export const addInitialBlogs = () => {
  return async (dispatch) => {
    dispatch({
      type: INITIALIZE_BLOGS,
      blogs: await blogService.getAllBlogs(),
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    await blogService.deleteBlog(blog, getState().user.token);
    dispatch({
      type: DELETE_BLOG,
      id: blog.id,
    });
  };
};
export default reducer;
