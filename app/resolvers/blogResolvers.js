const blogController = require("../controllers/blogs.js");
const { getUserById, getCommentById } = require("../services/firebaseService");

const blogsResolver = {
  Query: {
    blogs() {
      return blogController.getAllBlogs();
    },
    blog(parent, args) {
      return blogController.getBlogById(args.id);
    },
  },
  Blog: {
    comments(blog) {
      return Promise.all(
        blog.comments
          .split(",")
          .filter((i) => i)
          .map(getCommentById),
      );
    },
    author(blog) {
      return getUserById(blog.author);
    },
  },
};

module.exports = { blogsResolver };
