const { test, describe } = require("@jest/globals");

const listHelper = require("../utils/list_helper");

const listWithMultipleBlogs = require("./utls/sampleBlogList");

const listWithOneBlog = [listWithMultipleBlogs[1]];

const listWithoutBlogs = [];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has no blogs, equals 0", () => {
    const result = listHelper.totalLikes(listWithoutBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has multiple blogs, equals the sum of likes of the blogs", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has no blogs, equals null", () => {
    const result = listHelper.favoriteBlog(listWithoutBlogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("when list has multiple blogs, equals the first blog with the most number of likes", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual(listWithMultipleBlogs[2]);
  });
});

describe("most blog", () => {
  test("when list has no blogs, equals null", () => {
    const result = listHelper.mostBlogs(listWithoutBlogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog, equals the author of that blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const author = { author: listWithOneBlog[0].author, blogs: 1 };
    expect(result).toEqual(author);
  });

  test("when list has multiple blogs, equals the author with the most number of blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("when list has no blogs, equals null", () => {
    const result = listHelper.mostLikes(listWithoutBlogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog, equals the author of that blog and its likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const { author, likes } = listWithOneBlog[0];
    expect(result).toEqual({ author, likes });
  });

  test("when list has multiple blogs, equals the author with the most number of likes on their blog", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
