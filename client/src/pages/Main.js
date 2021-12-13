import React, { useState } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

//components
import Signup from "../components/Signup";
import Connect from "../components/Connect";

export default function Main() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [partnerID, setPartnerID] = useState("");
  
 

  const handlePartnerID = (e) => setPartnerID(e.target.value);

  const handleConnect = (e) => {
    e.preventDefault();
    const requestBody = { partnerID,  user};

    axios
    .post("/connect", requestBody)
    .then(()=>{})
    .catch(()=>{})
    setPartnerID('')
    //ConnectCheck()

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
      <form onSubmit={handleConnect}>
        <input type="text" value={partnerID} onChange={handlePartnerID}></input>
        <button type="submit">Connect!</button>
      </form>
    </div>
  : <Signup />}</>;
}
