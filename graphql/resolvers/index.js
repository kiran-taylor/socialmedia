const postResolvers = require("./posts");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
};
