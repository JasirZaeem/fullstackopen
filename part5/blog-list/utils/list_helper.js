const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likesSum, { likes }) => likesSum + likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce(
    (mostLiked, blog) => (mostLiked.likes > blog.likes ? mostLiked : blog),
    {
      likes: -1,
    }
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const numberOfBlogs = blogs.reduce((authors, blog) => {
    return { ...authors, [blog.author]: (authors[blog.author] || 0) + 1 };
  }, {});

  return Object.keys(numberOfBlogs).reduce(
    (author, currAuthor) => {
      return numberOfBlogs[currAuthor] > author.blogs
        ? { author: currAuthor, blogs: numberOfBlogs[currAuthor] }
        : author;
    },
    {
      author: "",
      blogs: -1,
    }
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const numberOfLikes = blogs.reduce((authors, blog) => {
    return {
      ...authors,
      [blog.author]: (authors[blog.author] || 0) + blog.likes,
    };
  }, {});

  return Object.keys(numberOfLikes).reduce(
    (author, currAuthor) => {
      return numberOfLikes[currAuthor] > author.likes
        ? { author: currAuthor, likes: numberOfLikes[currAuthor] }
        : author;
    },
    {
      author: "",
      likes: -1,
    }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
