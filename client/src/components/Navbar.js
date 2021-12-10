import React from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Navbar() {

    const { isLoggedIn, user} = useContext(AuthContext)
    
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      {isLoggedIn ?
       (
           <>
           <p>Connect your partner's account</p>
           <Link to='/connect'>
               <button>Connect</button>
           </Link>
           <button>Logout</button>
           </>
       ) : (
           <>
           <Link to='/login'>
               <button>Login</button>
           </Link>
           </>
       )}
    </nav>
  );
}
