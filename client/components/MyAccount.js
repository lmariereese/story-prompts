import React from 'react';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNew: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
  }

  render() {
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
                <span>{}</span>
                <button type="button">Edit</button>
              </div>
            </div>
            <div className="profile-section">
              <h4>Password</h4>
              <div className="password-update-form">
                <label htmlFor="current-password">Current Password</label>
                <input
                  placeholder="enter your current password"
                  type="password"
                  name="current-password"
                />
                <hr />
                <label htmlFor="new-password">New Password</label>
                <input
                  placeholder="enter a new password"
                  type="password"
                  name="new-password"
                />
                <label>Confirm New Password</label>
                <input
                  htmlFor="confirm-new-password"
                  placeholder="enter the password again"
                  type="password"
                  name="confirm-new-password"
                />
                <button type="button">Update Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
