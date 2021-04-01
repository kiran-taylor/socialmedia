import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Register(props) {
  const context = useContext(AuthContext);

  const { values, onSubmit, onChange } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: " ",
  });
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_INPUT, {
    update(proxy, results) {
      context.login(results);
      console.log(results);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <div style={{ width: "250px", margin: "auto", marginTop: "100px" }}>
      <h2>Register</h2>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          placeholder="username"
          name="username"
          type="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          placeholder="password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          placeholder="confirmPassword"
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Form.Input
          placeholder="email"
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul classsName="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_INPUT = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      username
      createdAt
      email
      token
    }
  }
`;

export default Register;
