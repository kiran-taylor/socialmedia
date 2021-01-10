const postResolvers = require("./posts");
const registerResolvers = require("./registerLogin");
const createResolvers = require("./creDel");
const commentResolver = require("./comment");

module.exports = {
  Post: {
    commentCount: (parent) => parent.comments.length,
    likesCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...registerResolvers.Mutation,
    ...createResolvers.Mutation,
    ...commentResolver.Mutation,
  },
};
