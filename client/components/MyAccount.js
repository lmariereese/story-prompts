import React from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../store/reducers/user';
import FormError from './FormError';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNew: '',
      toggleEdit: false,
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.error !== prevProps.error &&
      this.props.errorProperty === 'email'
    ) {
      this.setState({toggleEdit: true});
    }
  }

  // discardChanges () {
  //   if (this.props.errorProperty && (this.props.errorProperty === 'email')) {
  //     /// you were here!
  //   }
  // }

  toggleEdit() {
    this.setState(state => ({
      toggleEdit: !state.toggleEdit
    }));
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(type) {
    this.setState(state => ({
      toggleEdit: !state.toggleEdit
    }));
    if (type === 'email' && this.state.email) {
      this.props.updateUser('email', this.state.email);
      this.setState({email: '', toggleEdit: false});
    }
  }

  render() {
    // console.log(this.state.currentPassword);
    return (
      <div className="main-content-wrapper">
        <div>
          <h2>My Account</h2>
        </div>
        <div>
          <div className="profile-wrapper-div">
            <h3>Profile</h3>
            <div className="profile-section">
              <h4>Email Address</h4>
              <div>
                {this.state.toggleEdit ? (
                  <div className="email-update-form-wrapper">
                    <div className="email-update-form">
                      <input
                        placeholder="enter a new email address"
                        type="email"
                        name="email"
                        id="email-update-input"
                        value={this.state.email}
                        onChange={event => this.handleChange(event)}
                      />
                      <div id="email-update-btn-div">
                        <button
                          type="button"
                          className="inline"
                          onClick={() => this.handleSubmit('email')}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="inline"
                          onClick={this.toggleEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    {this.props.errorProperty === 'email' ? (
                      <FormError error={this.props.error.data} />
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  <div className="email-update-form-wrapper">
                    <div className="email-update-form">
                      <span className="display-email">
                        {this.props.userEmail}
                      </span>
                      <button
                        type="button"
                        className="inline"
                        onClick={this.toggleEdit}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="profile-section">
              <h4>Password</h4>
              <div className="password-update-form">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  placeholder="enter your current password"
                  type="password"
                  name="currentPassword"
                  className="account-input"
                  onChange={event => this.handleChange(event)}
                  value={this.state.currentPassword}
                />
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
                <button
                  type="button"
                  className="update-password-btn"
                  onClick={() => this.handleSubmit('password')}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  userEmail: state.user.email,
  error: state.user.error,
  errorProperty: state.user.errorProperty
});

const mapDispatch = dispatch => ({
  updateUser: (property, newVal) => dispatch(updateUser(property, newVal))
});

export default connect(mapState, mapDispatch)(MyAccount);
