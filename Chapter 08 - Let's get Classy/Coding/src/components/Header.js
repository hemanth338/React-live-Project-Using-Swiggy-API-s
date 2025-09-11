import React from "react";
import { LOGO_URL } from "../utils/constants";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      username: "",
      showLogin: false,
    };
  }

  // * if no dependency array => useEffect is called on every component render of the component
  // * if the dependency array is empty => useEffect is called only on the initial render(just once) of the component
  // * if the dependency array contains a dependency => useEffect is called everytime the value of the depencecy changes
  // * Dependency: A depency can be a state variable (or) a function

  // * componentDidMount is equivalent to useEffect with empty dependency array
  componentDidMount() {
    // console.log("Header component mounted");
  }

  handleLogin = (username) => {
    this.setState({
      isLoggedIn: true,
      username: username,
      showLogin: false,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      username: "",
    });
  };

  toggleLoginForm = () => {
    this.setState({
      showLogin: true,
    });
  };

  closeLoginForm = () => {
    this.setState({
      showLogin: false,
    });
  };

  render() {
    const { isLoggedIn, username, showLogin } = this.state;

    return (
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={LOGO_URL} alt="App Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-items">
          <ul>
            <li>
              <Link to="/" className="links">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="links">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="links">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="links">Cart</Link>
            </li>
            <button
              className="loginBtn"
              onClick={isLoggedIn ? this.handleLogout : this.toggleLoginForm}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </ul>

          {isLoggedIn && (
            <div className="welcome-user">Welcome, {username}!</div>
          )}

          {showLogin && !isLoggedIn && (
            <LoginForm
              onLogin={this.handleLogin}
              onClose={this.closeLoginForm}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Header;
