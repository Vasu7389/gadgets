import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Message from "../components/common/Message";
import Loader from "../components/common/Loader";
import { userListAction, deleteUserAction } from "../actions/userActions";

const UserListScreen = ({
  userList,
  userListAction,
  currentUserInfo,
  deleteUserAction,
  deleteUser,
  history,
}) => {
  const { loading, error, users } = userList;
  const { success: successDelete } = deleteUser;
  useEffect(() => {
    if (currentUserInfo && currentUserInfo.isAdmin) {
      userListAction();
    } else {
      history.push("/login");
    }
  }, [history, userListAction, currentUserInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteUserAction(id);
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{ color: "green" }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    currentUserInfo: state.userLogin.userInfo,
    deleteUser: state.deleteUser,
  };
};

export default connect(mapStateToProps, { userListAction, deleteUserAction })(
  UserListScreen
);
