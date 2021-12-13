import React, { useState } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

export default function Account() {
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
    
    const handleStopConnection = (e) => {

    }

    const handleDeleteAccount = (e) => {
        
    }

  return (
     <div>
     <h3>Hello {user.username}</h3>
     <p>Right now your account is connected with</p>
     <button onClick={handleStopConnection}>Stop connection</button>
     <p>Do you want to delete your account?</p>
     <p>All your data will be removed.</p>
     <button onClick={handleDeleteAccount}>Delete Account</button>

    </div>
    );
}
