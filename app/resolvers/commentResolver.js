const { format } = require("date-fns");
const { remove } = require("lodash");
const {
  getAllComments,
  getUserById,
  createComment,
  deleteComment,
} = require("../services/firebaseService");
const { checkRateLimit } = require("../utils/rateLimit");

const commentsResolver = {
  Query: {
    async comments(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);
      return getAllComments();
    },
  },
  Mutation: {
    async addComment(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);
      return createComment(args.input);
    },
    async deleteComment(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);
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
