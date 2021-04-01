import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS } from "../util/graphql";

function DeleteButton({ postid, commentid, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentid ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentid) {
        const data = proxy.readQuery({
          query: FETCH_POSTS,
        });
        const deletepost = data.getPosts.filter((p) => p.id !== postid);
        proxy.writeQuery({
          query: FETCH_POSTS,
          data: { getPosts: [...deletepost] },
        });
      }
      if (callback) callback();
    },
    variables: {
      postid,
      commentid,
    },
  });
  return (
    <>
      <Button color="red" floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postid: ID!) {
    deletePost(postid: $postid)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postid: ID!, $commentid: ID!) {
    deleteComment(postid: $postid, commentid: $commentid) {
      id
      username
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default DeleteButton;
