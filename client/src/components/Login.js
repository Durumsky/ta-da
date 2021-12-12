import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    axios
      .post("/login", requestBody)
      .then((response) => {
        console.log('Is the user connected to its partner?', response.data.userConnected)

        const token = response.data.authToken;
        //call logInUser from auth context
        //console.log("this is my token:", token);
        loginUser(token);
        navigate("/");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div>
        <form className="navbar-login" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}
