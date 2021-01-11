import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Card, Grid, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../component/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../component/DeleteButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  console.log("single-post-props", props);
  const postid = props.match.params.postid;

  const { data } = useQuery(FETCH_GET_POST, {
    variables: {
      postid,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkUp;

  if (!data) {
    postMarkUp = <p>loading....</p>;
  } else {
    const {
      id,
      body,
      username,
      createdAt,
      comments,
      likes,
      likesCount,
      commentCount,
    } = data.getPost;

    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card style={{ margin: "30px" }}>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likesCount }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comment" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postid={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkUp;
}

const FETCH_GET_POST = gql`
  query($postid: ID!) {
    getPost(postid: $postid) {
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

export default SinglePost;
