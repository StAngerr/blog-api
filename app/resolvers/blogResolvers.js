const blogController = require("../controllers/blogs.js");
const { getUserById, getCommentById, getAllComments} = require("../services/firebaseService");
const {getCommentsForBlog} = require("../controllers/blogs");

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
