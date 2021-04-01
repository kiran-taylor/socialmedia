import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const { onSubmit, onChange, values } = useForm(loginUser, {
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [LoginUser, { loading }] = useMutation(LOGIN_INPUT, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      console.log(userData);
      console.log("token", userData.token);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUser() {
    LoginUser();
  }

  return (
    <div style={{ width: "250px", margin: "auto", marginTop: "100px" }}>
      <h2>Login</h2>

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
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_INPUT = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      createdAt
      email
      token
    }
  }
`;

export default Login;
