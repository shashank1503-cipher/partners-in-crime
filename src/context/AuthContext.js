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
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('token', '');

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        console.log('Called');
        console.log(user)
        getUserDataFromMongo(user);
        setLoadingInitial(false);
      }),
    []
  );

  const getUserDataFromMongo = async (results) => {
    let token = results.accessToken;
    console.log(token);
    let User = results;
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
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: User,
      }),
    });

    data = await data.json();
    console.log(data);
    // if (data.code === 2) setUser(data.data);
    setUser(User);
  };

  const signInPopup = () =>
    signInWithPopup(auth, provider)
      .then(async results => {
        const domain = results.user.email.split('@')[1];
        if (domain === 'iiitkottayam.ac.in') {
          const credentials = GoogleAuthProvider.credentialFromResult(results);
          const token = credentials.idToken;
          setToken(token);
          navigate('/main');
        } else return logout();
      })
      .catch(error => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

  const logout = () => {
    setLoading(true);
    console.log('Logging out...');
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
