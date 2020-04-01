import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({showMenu: false}, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div className="nav-button-div">
        <button
          type="button"
          className="menu-drop-down-btn"
          onClick={this.showMenu}
        >
          Menu
        </button>
        {this.state.showMenu ? (
          <ul className="menu">
            {/* <li>
              <Link>My Groups</Link>
            </li> */}
            <li>
              <Link to="/prompts">Prompt Generator</Link>
            </li>
            <li>
              <Link to="/saved-prompts">Saved Prompts</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

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

export default connect(mapState, mapDispatch)(NavMenu);
