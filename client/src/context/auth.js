import React, {useState, useEffect} from 'react';
import axios from 'axios'


const AuthContext = React.createContext();


function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //Add methods to change auth state
    const loginUser = token => {
        //store this token in local storage
        localStorage.setItem('authToken', token)
        verifyStoredToken()

    }

    const verifyStoredToken = () => {
        //check localstorage for an authtoken
        const storedToken = localStorage.getItem('authToken')
        if (storedToken){
            axios.get('/verify', {headers: {'Authorization': `Bearer ${storedToken}`}})
            .then(response => {
                const user = response.data
                setUser(user)
                setIsLoggedIn(true)
                setIsLoading(false)
            })
            .catch(err => {
                //the token is invalid
                setIsLoggedIn(false)
                setUser(null)
                setIsLoading(false)
            })
        } else {
            //token is not available
            setIsLoading(false)
        }
    }

    useEffect(() => {

        verifyStoredToken()

    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, loginUser}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthProviderWrapper, AuthContext } 