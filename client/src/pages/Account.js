import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

export default function Account(props) {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [ connected, setConnected ] = useState()
  const [ partnerName, setPartnerName ] = useState()
  const [ partnerID, setPartnerID ] = useState()

  const navigate = useNavigate();

  //get the information: if there user is connected && with which user
  console.log(props)
  
  function checkInfo() {
    axios
    .post("/connectionInfo", user)
    .then((response) => {
      
        setConnected(response.data.connected)
        setPartnerName(response.data.partnerName)
        setPartnerID(response.data.partnerID)
      
    }
     
    )
    .catch((err) => console.log(err.data));
  }
checkInfo()

  const handleDeleteConnection = (e) => {
    e.preventDefault();
    axios.post("/deleteConnection",{user, partnerName})
    .then((response)=>{
      console.log(response.data)
    })
    .catch((err) => console.log(err.data));
    setConnected(false)
    navigate('/')
  };


 

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    axios.post("/deleteAccount", user)
    .then((response)=>{
      console.log(response.data)
    })
    .catch((err) => console.log(err.data))
    logoutUser()
  };

  console.log(partnerID, partnerName, connected)

  return (
    <div>
      <h3>Hello {props.name} {props.lastName}</h3>
      <h4>About your connection</h4>
      {connected ? (
        <>
        <p>Your account is connected with <b>{props.partnerName} {props.partnerLastName}</b></p>
      <button onClick={handleDeleteConnection}>Delete Connection</button>
        </>
      ) : (
        <p>Right now your account is not connected with any user</p>
      )}
      <h4>About your account</h4>
      <p>Do you want to delete your account?</p>
      <p>All your data will be removed.</p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}
