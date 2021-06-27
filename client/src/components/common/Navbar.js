import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Navbar.css";

const Navbar = ({ user, logout }) => {
  const [userName, setUserName] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    setUserName(user.userInfo);
  }, [user]);

  const onClickLogout = () => logout();
  return (
    <header className="navbar">
      <div className="navbar__appName">
        <Link to="/">gadgets</Link>
      </div>
      <div
        onClick={() => setOpenMenu(true)}
        className={!openMenu ? "navbar__toggleIcon" : "menuOptionHide"}
      >
        <i className="fas fa-bars" />
      </div>
      <div
        onClick={() => setOpenMenu(false)}
        className="navbar__toggleIcon"
        style={{ display: `${openMenu ? "block" : "none"}` }}
      >
        <i className="fas fa-times" />
      </div>
      <div
        className={!openMenu ? `navbar__options` : `navbar__optionsMobileView`}
      >
        <div
          className="navbar__userName sideMargin"
          onClick={() => setOpenMenu(false)}
        >
          <Link to="/profile">{userName?.name}</Link>
        </div>
        {user?.userInfo && (
          <div
            className="navbar__userName sideMargin"
            onClick={() => setOpenMenu(false)}
          >
            <Link to="/profile">Orders</Link>
          </div>
        )}

        <div
          className="navbar__cart sideMargin"
          onClick={() => setOpenMenu(false)}
        >
          <Link to="/cart">Cart</Link>
        </div>
        {user && user.userInfo?.isAdmin && (
          <>
            <div
              className="navbar__cart sideMargin"
              onClick={() => setOpenMenu(false)}
            >
              <Link to="/admin/userlist">Users</Link>
            </div>
            <div
              className="navbar__cart sideMargin"
              onClick={() => setOpenMenu(false)}
            >
              <Link to="/admin/productlist">Products</Link>
            </div>
            <div
              className="navbar__cart sideMargin"
              onClick={() => setOpenMenu(false)}
            >
              <Link to="/admin/orderList">Orders</Link>
            </div>
          </>
        )}
        <div
          className="navbar__auth sideMargin"
          onClick={() => setOpenMenu(false)}
        >
          {userName?.name ? (
            <div onClick={onClickLogout}>Logout</div>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userLogin,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
