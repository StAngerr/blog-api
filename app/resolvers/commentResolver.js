const { format } = require("date-fns");
const { remove } = require("lodash");
const {
  getAllComments,
  getUserById,
  createComment,
  deleteComment,
} = require("../services/firebaseService");

const commentsResolver = {
  Query: {
    comments() {
      return getAllComments();
    },
  },
  Mutation: {
    addComment(parent, args) {
      return createComment(args.input);
    },
    deleteComment(parent, args) {
      return deleteComment(args.id);
    },
  },
  Comment: {
    author(comment) {
      return getUserById(comment.author);
    },
  },
};

module.exports = { commentsResolver };
