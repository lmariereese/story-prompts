import React from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../store/reducers/user';
import FormError from './FormError';
import UpdatePassword from './UpdatePassword';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <div className="main-content-wrapper">
        <div>
          <h2>Account</h2>
        </div>
        <div>
          <div className="profile-wrapper-div">
            <h3>Profile</h3>
            <div className="profile-section">
              <h4>Email Address</h4>
              {this.props.user.googleId ? (
                <div>
                  <span className="display-email">{this.props.userEmail}</span>
                  <p>Manage your account settings through Google.</p>
                </div>
              ) : (
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
              )}
            </div>
            {this.props.user.googleId ? (
              ''
            ) : (
              <div className="profile-section">
                <h4>Password</h4>
                <UpdatePassword />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  userEmail: state.user.email,
  error: state.user.error,
  errorProperty: state.user.errorProperty
});

const mapDispatch = dispatch => ({
  updateUser: (property, newVal) => dispatch(updateUser(property, newVal))
});

export default connect(mapState, mapDispatch)(MyAccount);
