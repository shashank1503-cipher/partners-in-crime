import React, {createContext, useMemo, useContext, useState, useEffect} from 'react';
import { GoogleAuthProvider, signInWithPopup , onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import useLocalStorage from "use-local-storage";
import { useNavigate } from 'react-router';

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    hd: "iiitkottayam.ac.in"
})

const URL = 'http://localhost:8000';

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useLocalStorage("token", "")

    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => onAuthStateChanged(auth, (user) => {
        if(user)
            if(token === "")
                logout()
            else
            {
                getUserDataFromMongo(token, user) 
                navigate('/main')
            }
        else 
            logout()
        setLoadingInitial(false)
    }), [])

    const getUserDataFromMongo = async (token, results) => {

        let User = results;
        console.log(User)
        User = {
            name: User.displayName,
            email: User.email,
            photo: User.photoURL,
            g_id: User.uid,
            skills: [],
            batch: "20XX",
            socials: [],
        }

        let data = await fetch(`${URL}/auth/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                user: User
            })
        })

        data = await data.json()

        if(data.code === 2)
            setUser(data.data)

        setUser(User)
    }

    const signInPopup = () => signInWithPopup(auth, provider)
    .then(results => {
        const credentials = GoogleAuthProvider.credentialFromResult(results);
        const token = credentials.idToken;
        setToken(token)
    })
    .catch(error => {
        setError({
            code: error.code,
            message: error.message
        })
    });

    const logout = () => {
        setLoading(true)
        setToken("")
        signOut(auth)
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }

    const memo = useMemo(() => ({
        token,
        user,
        loading,
        error,
        signInPopup,
        logout
    }),[user, loading, error])

    return <AuthContext.Provider value={memo}>
        {!loadingInitial&&children}
    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext);
}
