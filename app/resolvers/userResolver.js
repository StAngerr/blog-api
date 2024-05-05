const { getAllUsers, getUserById } = require("../services/firebaseService");

const usersResolver = {
  Query: {
    users() {
      return getAllUsers();
    },
    user(parent, args) {
      return getUserById(args.id);
    },
  },
};

module.exports = { usersResolver };
