const { format } = require("date-fns");
const { remove } = require("lodash");
const { getAllComments } = require("../services/firebaseService");

const commentsResolver = {
  Query: {
    comments() {
      return getAllComments();
    },
  },
  Mutation: {
    addComment(parent, args) {
      // const blogId = parseInt(args.input.blog);
      // const newCommentId = Math.round(Math.random() * 1e10);
      // const newComment = {
      //   id: newCommentId,
      //   date: format(new Date(), "dd-MM-yyyy HH:mm"),
      //   ...args.input,
      // };
      // BlogsList.forEach((blog) => {
      //   if (blog.id === blogId) blog.comments.push(newCommentId);
      // });
      // CommentsList.push(newComment);
      // return newComment;
    },
    deleteComment(parent, args) {
      // const elem = remove(CommentsList, (i) => i.id === args.id)[0];
      // return !!elem;
    },
  },
  Comment: {
    author(comment) {
      // return UserList.find((user) => user.id === parseInt(comment.author));
    },
  },
};

module.exports = { commentsResolver };
