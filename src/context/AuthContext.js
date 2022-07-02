import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import useLocalStorage from 'use-local-storage';
import { useNavigate } from 'react-router';

const provider = new GoogleAuthProvider();

const URL = 'http://localhost:8000';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    
    // let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [token, setToken] = useLocalStorage('token', "");

    // useEffect(() => {
    //     console.log(user)
    //     console.log(token)
    // }, [user, token])

    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => onAuthStateChanged(auth, (g_user) => {
        console.log("G_USER : ", g_user)
        if(g_user)
            if(token === "")
            {
                console.log(token)
                logout()
            }
            else
            {
                getUserDataFromMongo(token, g_user)
                // navigate('/main');
            }
                
        else 
        {
            // console.log(user)
            logout()
        }
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
            batch: '20XX',
            socials: [],
        };

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
        else
            setUser(User)
    }


  const signInPopup = () =>
    signInWithPopup(auth, provider)
      .then(async results => {
        const domain = results.user.email.split('@')[1];
        
        console.log(results)
        console.log(domain)
        if (domain === 'iiitkottayam.ac.in') {
            const credentials = GoogleAuthProvider.credentialFromResult(results);
            const token = credentials.idToken;
            console.log(token)
            
            setToken(token);
        } 
        else return logout();
      })
      .catch(error => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    const logout = () => {
        setLoading(true);
        setUser(null)
        console.log('Logging out...');
        setToken("")
        signOut(auth)
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    };

    const memo = useMemo(
        () => ({
        token,
        user,
        loading,
        error,
        signInPopup,
        logout,
        }),
        [user, loading, error]
    );

  return (
    <AuthContext.Provider value={memo}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
