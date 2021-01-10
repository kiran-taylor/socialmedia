import React from "react";
import { Card, Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { VscArchive } from "react-icons/vsc";

const Post = ({
  post: { id, body, createdAt, username, commentCount, likesCount },
}) => (
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button as="div" labelPosition="right" size="mini">
              <Button basic color="red">
                <Icon name="heart" />
              </Button>
              <Label as="a" basic color="red" pointing="left">
                {likesCount}
              </Label>
            </Button>
            <Button as="div" labelPosition="right">
              <Button basic color="blue">
                <Icon name="comment" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentCount > 100 ? commentCount + "k" : commentCount}
              </Label>
            </Button>
          </div>
          <div>
            <Button color="red" size="mini">
              <VscArchive />
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default Post;
