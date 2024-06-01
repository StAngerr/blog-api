const blogController = require("../controllers/blogs.js");
const {
  getUserById,
  getCommentById,
  getAllComments,
} = require("../services/firebaseService");
const { getCommentsForBlog } = require("../controllers/blogs");
const { checkRateLimit } = require("../utils/rateLimit");

const blogsResolver = {
  Query: {
    async blogs(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);

      return blogController.getAllBlogs();
    },
    async blog(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);

      return blogController.getBlogById(args.id);
    },
  },
  Blog: {
    async comments(blog) {
      const blogComments = await getCommentsForBlog(blog);

      return blogComments;
    },
    author(blog) {
      return getUserById(blog.author);
    },
  },
};

module.exports = { blogsResolver };
