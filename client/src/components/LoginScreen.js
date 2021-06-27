import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/common/Message";
import Loader from "../components/common/Loader";
import { login } from "../actions/userActions";
import FormContainer from "./common/FormContainer";

const LoginScreen = ({ userLogin, login, location, history }) => {
  const { loading, error, userInfo } = userLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=") : "/";

  useEffect(() => {
    if (userInfo) {
      if (redirect[1]) {
        history.push(redirect[1]);
      } else {
        history.push("/");
      }
    }
  }, [history, userInfo, redirect]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSubmitForm}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link
            to={
              redirect[1] !== undefined
                ? `/register?redirect=${redirect[1]}`
                : "/register"
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};

export default connect(mapStateToProps, { login: login })(LoginScreen); //can use ES6 {login}
