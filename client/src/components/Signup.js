import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Signup() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pronounce, setPronounce] = useState("She/her");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value)
  const handleLastName = (e) => setLastName(e.target.value)
  const handlePronounce = (e) => setPronounce(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password, name, lastName, pronounce };

    axios
      .post("/signup", requestBody)
      .then((response) => {
        //redirect to -> /
        navigate("/");
        setUsername("");
        setPassword("");
        setName("");
        setLastName("");
        setPronounce("")
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="form-container">
        <h2>Signup</h2>
        <span>Create a new account to use Ta-da</span>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
        <div className="form-item">
        <label>Create your username</label>
        <input
            type="text"
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
        </div>
        <br></br>
        <div className="form-item">
          <label>What is your name?</label>
          <input
            type="text"
            value={name}
            onChange={handleName}
            placeholder="Name"
          />
          </div>
          <br></br>
          <div className="form-item">
          <label>What is your lastname?</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastName}
            placeholder="Lastname"
          />
          </div>
          <br></br>
          <div className="form-item">
          <label>How are you pronounced?</label>
          <select value= {pronounce} onChange={handlePronounce}>
          <option>She/her</option>
          <option>He/his</option>
          <option>They/their</option>
          </select>
          </div>
          <br></br>
          <div className="form-item">
          <label>Create a password</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          </div>
          <br></br>
          <br></br>
          <div className="form-item">
          <button className="btn-general" type="submit">Create Account</button>
          </div>
        </form>
        
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}
