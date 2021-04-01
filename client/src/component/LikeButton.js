import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";

function LikeButton({ user, post: { id, likes, likesCount } }) {
  const [liked, setLiked] = useState(false);
  const [setError] = useState({});

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postid: id },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to={`/login`} color="red" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" size="mini" onClick={likePost}>
      {likeButton}
      <Label basic color="red" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

const LIKE_POST = gql`
  mutation likePost($postid: ID!) {
    likes(postid: $postid) {
      id
      body
      username
      likes {
        id
        username
      }
      likesCount
    }
  }
`;
export default LikeButton;
