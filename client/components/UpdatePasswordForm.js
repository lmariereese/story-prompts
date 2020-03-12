// import React from 'react';
// import {connect} from 'react-redux';
// import {updateUserPassword} from '../store/reducers/user';
// import FormError from './FormError';

// const UpdatePasswordForm = ({handleSubmit, name}, props) => {
//   return (
//     <div className="password-update-form">
//       <form
//         onSubmit={handleSubmit}
//         name={name}
//         className="password-update-form"
//       >
//         <label htmlFor="currentPassword">Current Password</label>
//         <input
//           placeholder="enter your current password"
//           type="password"
//           name="currentPassword"
//           className="account-input"
//           // onChange={event => this.handleChange(event)}
//           // value={this.state.currentPassword}
//         />
//         {props.errorProperty === 'password' ? <FormError error ={props.error}/> : ''}
//         <label htmlFor="newPassword">New Password</label>
//         <input
//           placeholder="enter a new password"
//           type="password"
//           name="newPassword"
//           className="account-input"
//           // onChange={event => this.handleChange(event)}
//           // value={this.state.newPassword}
//         />
//         <label>Confirm New Password</label>
//         <input
//           htmlFor="confirm-new-password"
//           placeholder="enter the password again"
//           type="password"
//           name="confirmNew"
//           className="account-input"
//           // onChange={event => this.handleChange(event)}
//           // value={this.state.confirmNew}
//         />
//         <button
//           type="submit"
//           className="update-password-btn"
//           // onClick={() => handleSubmit('password')}
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// };

// const mapState = state => {
//   return {
//     name: 'password',
//     email: state.user.email,
//     error: state.user.error,
//     errorProperty: state.user.errorProperty
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const newPassword = evt.target.newPassword.value;
//       const currentPassword = evt.target.currentPassword.value;
//       dispatch(updateUserPassword(formName, newPassword, currentPassword));
//     }
//   };
// };

// export default connect(mapState, mapDispatch)(UpdatePasswordForm);
