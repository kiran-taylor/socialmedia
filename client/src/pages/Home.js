import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import Post from "../component/Post";
import { AuthContext } from "../context/auth";
import PostForm from "../component/PostForm";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS);
  console.log(data);
  return (
    <Grid columns="three" style={{ margin: "20px" }}>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <Post post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS = gql`
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

export default Home;
