import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Login from './Login'

import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Signup() {

    const { isLoggedIn, user} = useContext(AuthContext)

    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

    const handleUsername = e => setUsername(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { username, password }

        axios.post('/signup', requestBody)
        .then(response => {
            //redirect to -> /
            navigate('/')
            setUsername('')
            setPassword('')


        })
        .catch(err => {
            const errorDescription = err.response.data.message
            setErrorMessage(errorDescription)
        });
    }



    return (
        <>
        <div>
            <h2>Signup</h2>
            <p>Create a new account to use Ta-da</p>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={handleUsername} placeholder='Create your username'/>
                <input type='password' value={password} onChange={handlePassword} placeholder='Create your password' />

            <button type='submit'>Create Account</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
        </>
    )
}
