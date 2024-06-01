const { getAllUsers, getUserById } = require("../services/firebaseService");
const { checkRateLimit } = require("../utils/rateLimit");

const usersResolver = {
  Query: {
    async users(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);
      return getAllUsers();
    },
    async user(parent, args, context, info) {
      await checkRateLimit(parent, args, context, info);
      return getUserById(args.id);
    },
  },
};

module.exports = { usersResolver };
