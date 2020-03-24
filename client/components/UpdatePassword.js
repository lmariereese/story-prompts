import React from 'react';
import {connect} from 'react-redux';
import {updateUserPassword} from '../store/reducers/user';
import FormError from './FormError';

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNew: ''
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event, type) {
    // this.setState(state => ({
    //   toggleEdit: !state.toggleEdit
    // }));
    event.preventDefault();
    if (type === 'password') {
      this.props.updateUserPassword(
        'password',
        this.state.newPassword,
        this.state.currentPassword
      );
      this.setState({currentPassword: '', newPassword: '', confirmNew: ''});
    }
  }

  render() {
    return (
      <div className="password-update-form">
        <form
          onSubmit={event => this.handleSubmit(event, 'password')}
          name={name}
          className="password-update-form"
        >
          <label htmlFor="currentPassword">Current Password</label>
          <input
            placeholder="enter your current password"
            type="password"
            name="currentPassword"
            className="account-input"
            onChange={event => this.handleChange(event)}
            value={this.state.currentPassword}
          />
          {this.props.errorProperty === 'password' ? (
            <FormError error={this.props.error.data} />
          ) : (
            ''
          )}
          <label htmlFor="newPassword">New Password</label>
          <input
            placeholder="enter a new password"
            type="password"
            name="newPassword"
            className="account-input"
            onChange={event => this.handleChange(event)}
            value={this.state.newPassword}
          />
          <label>Confirm New Password</label>
          <input
            htmlFor="confirm-new-password"
            placeholder="enter the password again"
            type="password"
            name="confirmNew"
            className="account-input"
            onChange={event => this.handleChange(event)}
            value={this.state.confirmNew}
          />
          {this.state.newPassword &&
            this.state.confirmNew &&
            this.state.newPassword !== this.state.confirmNew && (
              <FormError error="Passwords do not match." />
            )}
          <button
            type="submit"
            className="update-password-btn"
            disabled={
              !this.state.currentPassword ||
              !this.state.newPassword ||
              !this.state.currentPassword ||
              this.state.newPassword !== this.state.confirmNew
            }
          >
            Update Password
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    name: 'password',
    email: state.user.email,
    error: state.user.error,
    errorProperty: state.user.errorProperty
  };
};

const mapDispatch = dispatch => {
  return {
    updateUserPassword: (property, newVal, oldVal) =>
      dispatch(updateUserPassword(property, newVal, oldVal))
  };
};

export default connect(mapState, mapDispatch)(UpdatePassword);
