const gql = require("graphql-tag");

// Defining type of Schema

module.exports = gql`
  # template string
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
  }
`;
