import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import Post from "../component/Post";
import { AuthContext } from "../context/auth";
import PostForm from "../component/PostForm";
import { FETCH_POSTS } from "../util/graphql";

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
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <Post post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
