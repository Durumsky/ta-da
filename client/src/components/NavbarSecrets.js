import React from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Login from './Login'

export default function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        <Link to="/app">
          <p> Back </p>
        </Link>
        {isLoggedIn ? (
            <div className="dropdown">
              <button className="dropbtn">
                {user.username} <span className="triangle"> ▾</span>
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <Link to="/app/account">
                  <p>Your account</p>
                </Link>
                <Link to="/">
                  <p onClick={logoutUser}>Logout</p>
                </Link>
              </div>
            </div>
        ) : (
          < Login />
        )}
      </nav>
    </>
  );
}
