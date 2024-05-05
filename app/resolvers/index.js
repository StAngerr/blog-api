const { blogsResolver } = require("./blogResolvers");
const { commentsResolver } = require("./commentResolver");
const { usersResolver } = require("./userResolver");

module.exports = {
  blogsResolver,
  commentsResolver,
  usersResolver,
};
