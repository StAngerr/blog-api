const firebaseService = require("../services/firebaseService");

async function getAllBlogs() {
  return firebaseService.getAllBlogs();
}

async function getBlogById(id) {
  return firebaseService.getBlogById(id);
}

async function getCommentsForBlog(blog) {
  const allComments = await firebaseService.getAllComments();
  const blogComments  = [];

  allComments.forEach((comment) => {
    if (comment.blogId === blog.id) blogComments.push(comment);
  });

  return blogComments;
}

module.exports = {
  getAllBlogs,
  getBlogById,
  getCommentsForBlog,
};
