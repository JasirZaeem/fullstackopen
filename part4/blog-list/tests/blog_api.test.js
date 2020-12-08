const { describe, test, beforeEach, afterAll } = require("@jest/globals");

const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = require("./utls/sampleBlogList");

describe("when there is initially some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
    const testPost = {
      title: "Test Blog",
      author: "T B L",
      url: "https://example.com",
      likes: 12,
    };

    const { body: newPostResponse } = await api
      .post("/api/blogs")
      .send(testPost);

    for (const key in testPost) {
      expect(newPostResponse[key]).toBe(testPost[key]);
    }

    const { body: blogListResponse } = await api.get("/api/blogs");

    expect(blogListResponse.length).toBe(initialBlogs.length + 1);
    expect(blogListResponse).toContainEqual(newPostResponse);
  });

  test("Missing like property defaults to 0", async () => {
    const testPost = {
      title: "Test Blog",
      author: "T B L",
      url: "https://example.com",
    };

    const { body: newPostResponse } = await api
      .post("/api/blogs")
      .send(testPost);

    expect(newPostResponse.likes).toBe(0);
  });

  test("Sending a post with missing title or url results in 400", async () => {
    const testPostMissingTitle = {
      author: "T B L",
      url: "https://example.com",
      likes: 12,
    };

    const testPostMissingUrl = {
      title: "Test Blog",
      author: "T B L",
      likes: 12,
    };

    const errorResponsePromises = [
      api.post("/api/blogs").send(testPostMissingTitle),
      api.post("/api/blogs").send(testPostMissingUrl),
    ];

    const errorResponses = await Promise.all(errorResponsePromises);

    errorResponses.forEach((errorResponse) => {
      expect(errorResponse.status).toBe(400);
    });
  });

  test("Sending a delete request removes the post", async () => {
    const { body: initialPostList } = await api.get("/api/blogs");
    await api.delete(`/api/blogs/${initialPostList.shift().id}`);
    const { body: updatedPostList } = await api.get("/api/blogs");

    expect(initialPostList).toEqual(updatedPostList);
  });

  test("Updating a post works", async () => {
    const { body: updatedPost } = await api
      .put(`/api/blogs/${initialBlogs[0]._id}`)
      .send({
        likes: 999,
      });

    expect(updatedPost.likes).toBe(999);

    const { body: updatedPostList } = await api.get("/api/blogs");
    expect(updatedPostList.find((post) => post.id === updatedPost.id)).toEqual(
      updatedPost
    );
  });
});

describe("adding users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("HTTP POST request to the /api/users url successfully creates a new user", async () => {
    const testUser = {
      name: "Jasir Zaeem",
      username: "JasirZaeem",
      password: "password",
    };

    const { body: newUserResponse } = await api
      .post("/api/users")
      .send(testUser);

    for (const key in testUser) {
      if (key !== "password") {
        expect(newUserResponse[key]).toBe(testUser[key]);
      }
    }

    const { body: userListResponse } = await api.get("/api/users");

    expect(userListResponse).toContainEqual(newUserResponse);
  });

  test("Sending a user with missing username or password results in 400", async () => {
    const testUserMissingUsername = {
      name: "Jasir Zaeem",
      password: "password",
    };

    const testUserMissingPassword = {
      name: "Jasir Zaeem",
      username: "JasirZaeem",
    };

    const errorResponsePromises = [
      api.post("/api/users").send(testUserMissingUsername),
      api.post("/api/users").send(testUserMissingPassword),
    ];

    const errorResponses = await Promise.all(errorResponsePromises);

    errorResponses.forEach((errorResponse) => {
      expect(errorResponse.status).toBe(400);
    });
  });

  test("Sending a user with password or username shorter than 3 characters results in 400", async () => {
    const testUserShortUsername = {
      name: "Jasir Zaeem",
      username: "Ja",
    };

    const testUserShortPassword = {
      name: "Jasir Zaeem",
      password: "pa",
    };

    const errorResponsePromises = [
      api.post("/api/users").send(testUserShortUsername),
      api.post("/api/users").send(testUserShortPassword),
    ];

    const errorResponses = await Promise.all(errorResponsePromises);

    errorResponses.forEach((errorResponse) => {
      expect(errorResponse.status).toBe(400);
    });
  });
});

test("Sending a user with existing username results in 409", async () => {
  const testUser = {
    name: "Jasir Zaeem",
    username: "JasirZaeem",
    password: "password",
  };

  // Add User
  await api.post("/api/users").send(testUser);

  // Add user with same username again
  const errorResponse = await api.post("/api/users").send(testUser);

  expect(errorResponse.status).toBe(409);
});

afterAll(async () => {
  await mongoose.connection.close();
});
