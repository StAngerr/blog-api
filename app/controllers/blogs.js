const firebaseService = require("../services/firebaseService");

async function getAllBlogs() {
  return firebaseService.getAllBlogs();
}

async function getBlogById(id) {
  return firebaseService.getBlogById(id);
}

module.exports = {
  getAllBlogs,
  getBlogById,
};
