import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Grid, Button, Icon, Label, Form } from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../component/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../component/DeleteButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  console.log("single-post-props", props);

  const [comment, setComment] = useState("");
  const postid = props.match.params.postid;

  const { data } = useQuery(FETCH_GET_POST, {
    variables: {
      postid,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postid,
      body: comment,
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

    console.log("comments", comments);

    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                margin: "10px",
              }}
            >
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
            {user && (
              <Card style={{ paddingRight: "100px" }}>
                <Card.Content>
                  <p>post a comment</p>
                  <Form>
                    <div className="ui action input ">
                      <input
                        type="text"
                        placeholder="comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button red"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postid={id} commentid={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
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

const SUBMIT_COMMENT = gql`
  mutation($postid: ID!, $body: String!) {
    createComment(postid: $postid, body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        username
        createdAt
      }
      likesCount
      commentCount
    }
  }
`;

export default SinglePost;
