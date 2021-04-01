import React, { useContext } from "react";
import { Card, Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function Post({
  post: {
    id,
    body,
    createdAt,
    username,
    commentCount,
    likesCount,
    likes,
    comments,
  },
}) {
  const { user } = useContext(AuthContext);
  return (
    <Card.Group>
      <Card fluid style={{ marginTop: "30px" }}>
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <div>
              <LikeButton user={user} post={{ id, likes, likesCount }} />
              <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                <Button basic color="blue">
                  <Icon name="comment" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount > 100 ? commentCount + "k" : commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postid={id} />
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default Post;
