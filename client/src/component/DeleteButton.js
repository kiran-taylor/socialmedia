import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS } from "../util/graphql";

function DeleteButton({ postid, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      data.getPosts = data.getPosts.filter((p) => p.id !== postid);
      proxy.writeQuery({ query: FETCH_POSTS, data });
      if (callback) callback();
    },
    variables: {
      postid,
    },
  });
  return (
    <div>
      <Button floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </div>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postid: ID!) {
    deletePost(postid: $postid)
  }
`;

export default DeleteButton;
