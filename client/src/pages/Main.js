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
  let isConnected;

  //check the status isConnected every 2s if its value is false
  const ConnectCheck = () => {
    if (isLoggedIn === true) {
      return axios
        .post("/connectCheck", user)
        .then((response) => {
          //console.log(response.data.userConnected)
          isConnected = response.data.userConnected;
          if (isConnected) {
            console.log("The accounts are connected!");
          } else {
              if (isLoggedIn){
                setTimeout(ConnectCheck, 5000);
            console.log("The accounts are still not connected");  
              } 
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ConnectCheck()

  return <>{isLoggedIn ? <Connect /> : <Signup />}</>;
}
