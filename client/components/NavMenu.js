import React from 'react';
import { Link } from 'react-router-dom';

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
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div className="nav-button-div">
        <button
          type="button"
          className="menu-drop-down"
          onClick={this.showMenu}
        >
          Menu
        </button>
        {this.state.showMenu ? (
          // <div className="menu-div">
          <ul className="menu">
            <li>
              <Link>My Account</Link>
            </li>
            <li>
              <Link to="/saved-prompts">Saved Prompts</Link>
            </li>
            <li>
              <Link>Groups</Link>
            </li>
          </ul>
        ) : // </div>
        null}
      </div>
    );
  }
}

export default NavMenu;
