import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS } from "../util/graphql";

function PostForm() {
  const { values, onSubmit, onChange } = useForm(createPostCallback, {
    body: "",
  });

  const [error, setError] = useState({});

  const [createPost] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      const new_post = result.data.createPost;
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: { getPosts: [new_post, ...data.getPosts] },
      });
      values.body = "";
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ marginTop: "30px" }}>
        <h3>Create a post </h3>
        <Form.Field>
          <Form.Input
            placeholder="create a post"
            type="text"
            error={error.body ? true : false}
            name="body"
            onChange={onChange}
            value={values.body}
          />
        </Form.Field>
        <Button type="submit" color="black">
          Post
        </Button>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message">
          <ul className="list">{Object.values(error)}</ul>
          {/* <Button>close</Button> */}
        </div>
      )}
    </>
  );
}
const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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

export default PostForm;
