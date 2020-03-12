import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Login, Signup} from './auth-form';

const LoginSignup = props => {
  const method = props.match.params.method;
  let displayName =
    method === 'login' ? 'Log into your account' : 'Create your account';
  return (
    <div className="main-content-wrapper">
      <div className="ls-section-wrapper">
        {method === 'login' ? (
          <div className="ls-section">
            <h2>{displayName}</h2>
            <Login />
            <div>
              <p>
                Don't have an account? <Link to="/account/signup">Sign up</Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="ls-section">
            <h2>{displayName}</h2>
            <Signup />
            <div>
              <p>
                Already have an account? <Link to="/account/login">Login</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

export default withRouter(connect(mapState)(LoginSignup));
