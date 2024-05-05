const { loadSchemaSync, loadDocuments } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { join } = require("node:path");

const blogDefs = loadSchemaSync(join(__dirname, "blog.graphql"), {
  loaders: [new GraphQLFileLoader()],
});
const userDefs = loadSchemaSync(join(__dirname, "user.graphql"), {
  loaders: [new GraphQLFileLoader()],
});
const commentsDefs = loadSchemaSync(join(__dirname, "comment.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

module.exports = { blogDefs, userDefs, commentsDefs };
