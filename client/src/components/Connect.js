import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Connect() {

  const [partnerID, setPartnerID] = useState("");
  const [accept, setAccept] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
 

  const handlePartnerID = (e) => setPartnerID(e.target.value);

  const handleConnect = (e) => {
    e.preventDefault();
    const requestBody = { partnerID,  user};

    axios
    .post("/connect", requestBody)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription);
    });
    //setPartnerID('')

  }

  return (
    <div>
      <h3>Hello {user.username}, this is your ID: </h3>
      <p className="id-box">{user._id}</p>
      <h3>Would you to connect with your partner?</h3>
      <p>Copy here the ID of your partner:</p>
      <form onSubmit={handleConnect}>
        <input type="text" value={partnerID} onChange={handlePartnerID}></input>
        <button type="submit">Connect!</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
