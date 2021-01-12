const gql = require("graphql-tag");

// Defining type of Schema

module.exports = gql`
  # template string
  type Post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likesCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postid: ID!): Post!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String): User!
    createPost(body: String!): Post!
    deletePost(postid: ID!): String!
    createComment(postid: ID!, body: String!): Post!
    deleteComment(postid: ID!, commentid: ID!): Post!
    likes(postid: ID!): Post!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type User {
    id: ID!
    username: String!
    createdAt: String!
    email: String!
    token: String!
  }
`;
