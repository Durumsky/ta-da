import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { AuthContext } from "../context/auth"
import { useContext } from "react"

export default function UserSecrets(props) {
    const { user } = useContext(AuthContext);
    const [newSecretTitle, setNewSecretTitle] = useState("");
    const [newSecret, setNewSecret] = useState("");
    const [userSecrets, setUserSecrets] = useState([]);

    const [showUserSecrets, setShowUserSecrets] = useState(false);
    const [showAddNewSecret, setShowAddNewSecret] = useState(false);


    const partnerUsername = props.partnerUsername

    const handleNewSecretTitle = (e) => {setNewSecretTitle(e.target.value)}
    const handleNewSecret = (e) => {setNewSecret(e.target.value)}
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAddNewSecret(showAddNewSecret => !showAddNewSecret)
        axios
        .post("/addNewSecret", {newSecretTitle, newSecret, user})
        .then(()=>{
            setNewSecretTitle("")
            setNewSecret("")
        })
        .catch(err => {console.log(err.data)})
    }

    const handleShowSecrets = (e) => {
        e.preventDefault();
        setShowUserSecrets((showUserSecrets) =>  !showUserSecrets)
        axios
        .post("/showSecrets", user)
        .then((response)=>{
            setUserSecrets(response.data.foundSecrets)
        })
        .catch(err => {console.log(err.data)})  
    }

    const handelShowAddSecret = () => {
        setShowAddNewSecret(showAddNewSecret=> !showAddNewSecret)
    }

    return (
        <div>
        <h3>Your Secret Wishes</h3>
        <img src="https://media.giphy.com/media/kE3oHWRe1Td2oLeIX7/giphy.gif" alt="morty flappy lips" style={{width: 300}}/>
        <br></br>
        <br></br>
        <button className="btn-general" onClick={handleShowSecrets}>Open the Secrets</button>
        <div className="user-color">
        {showUserSecrets && (
        


            userSecrets.map((secret) => {
            return (
            <>
            <p><b>{secret.secretTitle}</b></p>
            <br></br>
            <p>{secret.secret}</p>
            </>
            )
            
        })
        )}
        </div>
        <br></br>
        <br></br>
    
            

        {showAddNewSecret &&
             <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Give me a title" style={{width: 500}} value={newSecretTitle} onChange={handleNewSecretTitle}></input>
            <br></br>
            <br></br>
            <textarea style={{width: 500}} placeholder="Write your secret wish here" value={newSecret} onChange={handleNewSecret}></textarea>
            <br></br>
            <br></br>
            <button className="btn-general" type="submit">Add</button>
            
        </form>
        }
        <button className="btn-general" onClick={handelShowAddSecret}>Add Secret Wish</button>
            
        </div>
    )
}
