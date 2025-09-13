import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const onlineStatus = useOnlineStatus();

  const handleLogin = (uname) => {
    setIsLoggedIn(true);
    setUsername(uname);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={LOGO_URL} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "✅" : "⛔"}</li>
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
            <Link to="/grocery" className="links">
              Grocery
            </Link>
          </li>
          <li>
            <Link className="links">Cart</Link>
          </li>
          <button
            className="loginBtn"
            onClick={isLoggedIn ? handleLogout : () => setShowLogin(true)}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </ul>

        {isLoggedIn && <div className="welcome-user">Welcome, {username}!</div>}

        {showLogin && !isLoggedIn && (
          <LoginForm
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
