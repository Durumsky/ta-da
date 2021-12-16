import "./App.css";
import axios from "axios";
import { AuthContext } from "../src/context/auth";
import React, { useState } from "react";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main";
import Tada from "./pages/Tada";
import Account from "./pages/Account";
import Secrets from "./pages/Secrets";



import { Routes, Route } from "react-router-dom";

function NotFound() {
  return <h1>Not found - 🙈</h1>;
}

function App() {
  //user info:
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pronounce, setPronounce] = useState("");
  const [connected, setConnected] = useState("");
  //partner info:
  const [partnerID, setPartnerID] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerLastName, setPartnerLastName] = useState("");
  const [partnerPronounce, setPartnerPronounce] = useState("");

  function checkInfo() {
    axios
      .post("/connectionInfo", user)
      .then((response) => {
        console.log(response.data)
        setConnected(response.data.connected)
        setName(response.data.name)
        setLastName(response.data.lastName)
        setPronounce(response.data.pronounce)
        setPartnerName(response.data.partnerName)
        setPartnerLastName(response.data.partnerLastName)
        setPartnerPronounce(response.data.partnerPronounce)
        setPartnerID(response.data.partnerID)
      })
      .catch((err) => console.log(err.data));
  }
  checkInfo();

  console.log(connected, name, lastName, pronounce, partnerName, partnerLastName, partnerPronounce)

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div style={{ maxWidth: 900 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute redirectTo="/">
                  <Tada name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/app/account"
              element={
                <ProtectedRoute redirectTo="/">
                  <Account name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/secrets"
              element={
                <ProtectedRoute redirectTo="/">
                  <Secrets name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce}/>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
