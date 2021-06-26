import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Message from "../components/common/Message";
import Loader from "../components/common/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { myOrdersAction } from "../actions/orderActions";

const ProfileScreen = ({
  userDetails,
  userLogin,
  getUserDetails,
  updateUserProfile, //action, naming convention?
  userUpdatedProfile, //state after update
  myOrdersAction, //fetches current user orders
  myOrders, //current user order list from myOrdersAction
  history,
}) => {
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userUpdatedProfile;
  const { loading: loadingOrders, myOrderList, error: errorOrders } = myOrders;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      myOrdersAction();
      if (!user.name) {
        getUserDetails("profile");
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [getUserDetails, userInfo, user, history, myOrdersAction]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      updateUserProfile({
        id: userInfo._id,
        name,
        email,
        password,
      });
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{"Profile updated!"}</Message>}
        {loading && <Loader />}
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
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrderList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    userLogin: state.userLogin,
    userUpdatedProfile: state.userUpdateProfile,
    myOrders: state.myOrders,
  };
};

export default connect(mapStateToProps, {
  getUserDetails,
  updateUserProfile,
  myOrdersAction,
})(ProfileScreen); //can use ES6 {login}
