import axios from "axios";

const baseApiUrl = "http://localhost:3001/api";
const blogEndpoint = "/blogs";
const userEndpoint = "/users";
const loginEndpoint = "/auth/login";
const commentEndpoint = (id) => `${blogEndpoint}/${id}/comments`;

const bearer = (token) => `Bearer ${token}`;

const getAllBlogs = async () => {
  const response = await axios.get(`${baseApiUrl}${blogEndpoint}`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${baseApiUrl}${userEndpoint}`);
  return response.data;
};

const loginUser = async (username, password) => {
  const response = await axios.post(`${baseApiUrl}${loginEndpoint}`, {
    username,
    password,
  });
  return response.data;
};

const addBlog = async (blogData, token) => {
  const response = await axios.post(`${baseApiUrl}${blogEndpoint}`, blogData, {
    headers: {
      Authorization: bearer(token),
    },
  });
  return response.data;
};

const likeBlog = async ({ id, likes, user }, token) => {
  const response = await axios.put(
    `${baseApiUrl}${blogEndpoint}/${id}`,
    { likes: likes + 1 },
    {
      headers: {
        Authorization: bearer(token),
      },
    }
  );
  return { ...response.data, user };
};

const deleteBlog = async ({ id }, token) => {
  await axios.delete(`${baseApiUrl}${blogEndpoint}/${id}`, {
    headers: {
      Authorization: bearer(token),
    },
  });
};

const addComment = async ({ id }, text, token) => {
  const response = await axios.post(
    `${baseApiUrl}${commentEndpoint(id)}`,
    { text },
    {
      headers: {
        Authorization: bearer(token),
      },
    }
  );
  return response.data;
};

const blogService = {
  getAllBlogs,
  getAllUsers,
  loginUser,
  addBlog,
  likeBlog,
  deleteBlog,
  addComment,
};
export default blogService;
