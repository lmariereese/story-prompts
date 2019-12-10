import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import NavMenu from './NavMenu';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="nav">
    <div>
      <div>
        <h1 className="site-title">Story Maker</h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <a href="#" className="nav-link" onClick={handleClick}>
              Logout
            </a>
            {/* <div className="nav-button-div">
              <button type="button" className="menu-drop-down">Menu</button>
            </div> */}
            <NavMenu />
            <div className="account-div">
              <img src="https://image.flaticon.com/icons/svg/126/126486.svg" />
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
    {/* <hr /> */}
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
