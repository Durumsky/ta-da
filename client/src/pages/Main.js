import React, { useState } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

//components
import Signup from "../components/Signup";

export default function Main() {
  const [partnerID, setPartnerID] = useState("");
  const [partnerFound, setPartnerFound] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  
  let partnerName = "";

  const handlePartnerID = (e) => setPartnerID(e.target.value);

  const handleConnect = (e) => {
    e.preventDefault();
    const requestBody = { partnerID, user };

    axios
      .post("/connect", requestBody)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
    setPartnerID('')
  };

  const handleAccept = (e) => {

  }

  const handleDeny = (e) => {
    setPartnerFound = false
  }
  
  //check the status isConnected every 2s if its value is false
  // let isConnected;
  // const ConnectCheck = () => {
  //   if (isLoggedIn === true) {
  //     return axios
  //       .post("/connectCheck", user)
  //       .then((response) => {
  //         //console.log(response.data.userConnected)
  //         isConnected = response.data.userConnected;
  //         if (isConnected) {
  //           console.log("The accounts are connected!");
  //         } else {
  //             if (isLoggedIn){
  //               setTimeout(ConnectCheck, 5000);
  //           console.log("The accounts are still not connected");  
  //             } 
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  //ConnectCheck()

  return <>{isLoggedIn ? 
    <div>
      <h3>Hello {user.username}, this is your ID: </h3>
      <p className="id-box">{user._id}</p>
      <h3>Would you to connect with your partner?</h3>
      <p>Copy here the ID of your partner:</p>
      <form onSubmit={handleAccept}>
        <input type="text" value={partnerID} onChange={handlePartnerID}></input>
        <button onClick={handleConnect} >Connect!</button>
        {partnerFound &&
        <>
        <p>Do you want to connect with {partnerName}?</p>
        <button type="submit">Accept</button>
        <button onClick={handleDeny}>Deny</button>
        </>
        }
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  : <Signup />}</>;
}
