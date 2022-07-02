import React, {createContext, useMemo, useContext, useState, useEffect} from 'react';
import useAuth from './AuthContext';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';

// import 'firebase/firestore';
// import 'firebase/auth';

const AppContext = createContext({})

export const AppProvider = ({children}) => {

    const {user} = useAuth()

    const [messages, setMessages] = useState([])
    const colRef = collection(db, 'chats')

    // let myq;
    // if(user)
    // {
    //     myq = query(colRef, where("users", 'array-contains', user?.g_id))
        
    // }

    // useEffect(() => {
    //     console.log(messages)
    // }, [messages])

    // useEffect(() => {

    //     if(!user)
    //         return;

        
        
        
    // }, [user])

    const memo = useMemo(() => ({
        messages
    }),[messages])

    return <AppContext.Provider value={memo}>
        {children}
    </AppContext.Provider>
}


export default function useApp() {
    return useContext(AppContext);
}
