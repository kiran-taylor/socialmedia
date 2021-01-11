import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likesCount
      commentCount
    }
  }
`;
