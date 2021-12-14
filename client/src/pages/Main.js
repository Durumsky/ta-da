import React, { useState } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

//components
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";

export default function Main() {
  const [partnerID, setPartnerID] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerFound, setPartnerFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [accept, setAccept] = useState(false);
  const [usersConnected, setUsersConnected] = useState(false);

  const navigate = useNavigate();

  function connectCheck() {
    let isConnected;
    if (usersConnected === true) {
      console.log("The accounts are connected (useState Check)!");
      navigate("/app");
    } else {
      if (isLoggedIn === true) {
        return axios
          .post("/connectCheck", user)
          .then((response) => {
            isConnected = response.data.userConnected;
            if (isConnected) {
              console.log("The accounts are connected! (DB check)");
              setUsersConnected(true);
              navigate("/app");
            } else {
              if (isLoggedIn) {
                setTimeout(connectCheck, 5000);
                console.log("The accounts are still not connected");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  connectCheck();

  const handlePartnerID = (e) => setPartnerID(e.target.value);

  const handleConnect = (e) => {
    e.preventDefault();
    const requestBody = { partnerID, user };

    axios
      .post("/connect", requestBody)
      .then((response) => {
        setPartnerName(response.data.partnerName);
        setPartnerFound(response.data.foundPartner);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleAccept = (e) => {
    e.preventDefault();
    const requestBody = { partnerID, user };
    setAccept((accept) => !accept);

    axios
      .post("/acceptConnect", requestBody)
      .then((response) => {
        setUsersConnected(response.data.userConnected);
      })

      .catch((err) => {
        console.log(err.data);
      });
  };

  const handleDeny = (e) => {
    setPartnerFound(false);
  };

  //check the status isConnected every 2s if its value is false

  return (
    <>
  
      <div className="app-container">
        {isLoggedIn ? (
          <div>
            <h3>Hello {user.username}, this is your ID: </h3>
            <p className="id-box">{user._id}</p>
            <h3>Would you to connect with your partner?</h3>
            <form onSubmit={handleAccept}>
              {!partnerFound && (
                <>
                  <p>Copy here the ID of your partner:</p>
                  <input
                    type="text"
                    value={partnerID}
                    onChange={handlePartnerID}
                  ></input>
                  <button onClick={handleConnect}>Connect!</button>
                </>
              )}

              {partnerFound && (
                <>
                  <p>
                    Do you want to connect with <b>{partnerName}</b>?
                  </p>
                  <button type="submit">Accept</button>
                  <button onClick={handleDeny}>Deny</button>
                  {!usersConnected && accept && (
                    <p>
                      Wait until <b>{partnerName}</b> also accepts the
                      connection
                    </p>
                  )}
                </>
              )}
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        ) : (
          <Signup />
        )}
      </div>
    </>
  );
}
