import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/common/Message";
import Loader from "../components/common/Loader";
import {
  getUserDetails,
  updateUserAction,
  userUpdateResetDispatch,
} from "../actions/userActions";
import FormContainer from "./common/FormContainer";

const UserEditScreen = ({
  match,
  getUserDetails,
  userDetails,
  updateUserState,
  userUpdateResetDispatch,
  updateUserAction,
  history,
}) => {
  const userId = match.params.id;
  const { loading, error, user } = userDetails;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateUserState;
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (successUpdate) {
      userUpdateResetDispatch();
      history.push("/admin/userList");
    } else {
      if (!user.name || user._id !== userId) {
        getUserDetails(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [
    user,
    getUserDetails,
    userId,
    history,
    successUpdate,
    userUpdateResetDispatch,
  ]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    updateUserAction({
      _id: userId,
      name,
      email,
      isAdmin,
    });
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-2">
        Go Back{" "}
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={onSubmitForm}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    updateUserState: state.updateUser,
  };
};

export default connect(mapStateToProps, {
  getUserDetails: getUserDetails,
  updateUserAction,
  userUpdateResetDispatch,
})(UserEditScreen); //can use ES6 {getUserDetails}
