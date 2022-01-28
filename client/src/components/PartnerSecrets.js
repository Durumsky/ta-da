import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { AuthContext } from "../context/auth"
import { useContext } from "react"

export default function PartnerSecrets(props) {
    const partnerID = props.partnerID
    
    const [showPartnerSecrets, setShowPartnerSecrets] = useState(false);
    const [partnerSecrets, setPartnerSecrets] = useState([]);


    const handleShowPartnerSecrets = (e) => {
        e.preventDefault();
        setShowPartnerSecrets((showUserSecrets) =>  !showUserSecrets)
        axios
        .post("/partner-secrets", {partnerID})
        .then((response)=>{
            setPartnerSecrets(response.data.foundSecrets)
        })
        .catch(err => {console.log(err.data)})  

    }
    return (
        <div>
             <h3>{props.partnerName}'s Secret Wishes</h3>
             
             <img src="https://i.ytimg.com/vi/TRPIsrxUc_E/maxresdefault.jpg" alt="rick, morty and summer" style={{width: 300}}/>
             <br></br>
             <br></br>
             
        <button className="btn-general" onClick={handleShowPartnerSecrets}>Open the secrets</button>
        <div className="partner-color">
        {showPartnerSecrets && partnerSecrets.map((secret) => {
            return (
            <>
            <p><b>{secret.secretTitle}</b></p>
            <br></br>
            <p>{secret.secret}</p>
            </>
            )
            
        })}
        </div>
        </div>
    )
}
