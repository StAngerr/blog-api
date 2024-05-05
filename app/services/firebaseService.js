const { collection, getDocs } = require("firebase/firestore");
const { cert, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

async function getAllBlogs() {
  const blogsSnapshot = await db.collection("blogs").get();
  const blogs = [];
  //const authorPromises = [];

  blogsSnapshot.forEach((doc) => {
    const blogData = doc.data();

    //authorPromises.push(db.collection("users").doc(blogData.author).get());
    blogs.push({ id: doc.id, ...blogData });
  });

  // const authorSnapshots = await Promise.all(authorPromises);
  //
  // authorSnapshots.forEach((authorSnapshot, index) => {
  //   const authorId = authorSnapshot.id;
  //   const blog = blogs.find((b) => b.author === authorId);
  //   if (blog) blog.author = { id: authorId, ...authorSnapshot.data() };
  // });

  return blogs;
}

async function getBlogById(id) {
  const blogsSnapshot = await db.collection("blogs").doc(id).get();
  const blogData = blogsSnapshot.data();

  return { id, ...blogData };
}

const getAllUsers = async () => {
  const usersSnapshot = await db.collection("users").get();
  const users = [];

  usersSnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};

const getUserById = async (id) => {
  const usersSnapshot = await db.collection("users").doc(id).get();

  return {
    id,
    ...usersSnapshot.data(),
  };
};

const getCommentById = async (id) => {
  const commentSnapshot = await db.collection("comments").doc(id).get();

  return {
    id,
    ...commentSnapshot.data(),
  };
};

const getAllComments = async () => {
  const commentsSnapshot = await db.collection("comments").get();
  const comments = [];

  commentsSnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  return comments;
};

const createComment = async (comment) => {
  return db.collection("comments").add(comment);
};

const deleteComment = async (id) => {
  return db.collection("comments").doc(id).delete();
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getUserById,
  getCommentById,
  getAllUsers,
  getAllComments,
  createComment,
  deleteComment,
};
