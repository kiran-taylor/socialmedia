import React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";

function PostForm() {
  const { values, onSubmit, onChange } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, results) {
      console.log("proxy", proxy);
      console.log("results", results);
      values.body = "";
      console.log("values", values);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            placeholder="create a post"
            type="text"
            error={error ? true : false}
            name="body"
            onChange={onChange}
            value={values.body}
          />
        </Form.Field>
        <Button type="submit" color="black">
          Post
        </Button>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}
const CREATE_POST = gql`
  mutation createpost($body: String!) {
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
