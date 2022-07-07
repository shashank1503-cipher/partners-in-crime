import React, {createContext, useMemo, useContext, useState, useEffect} from 'react';
import useAuth from './AuthContext';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';

// import 'firebase/firestore';
// import 'firebase/auth';




const AppContext = createContext({})

export const AppProvider = ({children}) => {

    const {user, token} = useAuth()

    const [messages, setMessages] = useState({})
    const [messagesUsersId, setMessagesUsersId] = useState(new Set())
    const [messagesUserData, setMessagesUserData] = useState([])
    const [messagesLoading, setMessagesLoading] = useState(true)
    const colRef = collection(db, 'chats')

    let myq;

    const getMessages = async () => {

        setMessagesLoading(true)
        if(user)
        {
            myq = query(colRef, where("users", 'array-contains', user?.g_id), orderBy('timeStamp'))
            onSnapshot(myq, snapshot => {
                
                let mess = {}
                snapshot.docs.forEach((doc) => {
                    const doc_id = doc.id
                    const data = doc.data()
                    const otherUserId = user.g_id===data.users[0]?data.users[1]:data.users[0];
                    setMessagesUsersId(prev => new Set([...prev, otherUserId]))

                    if(!mess[otherUserId])
                    {
                        mess = {
                            ...mess, 
                            [otherUserId]: {
                                messagesArray: []
                            }
                        }
                    }

                    mess[otherUserId].messagesArray.push({
                        message: data.message,
                        who: data.sender===user.g_id?1:0,
                        id: doc_id
                    })
                })

                setMessages(mess)
            })
        }
    }


    useEffect(() => {
        if(user)
        {
            getMessages()
        }
    }, [user])

    useEffect(() => {

        
        const checkIfDataAvailable = async () => {
            
            for(let id of messagesUsersId)
            {
                let userData = {}
                if(messagesUserData.filter(m => m.g_id === id).length === 1)
                {
                    
                }
                else
                {
                    let data = await fetch(`http://localhost:8000/auth/getUser`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            g_id: id
                        }),
                    });

                    data = await data.json()
                    
                    if(data.error)
                    {
                        console.log("error")
                    }
                    else
                    {
                        userData = {
                                ...data.user
                            }
                    }
                    setMessagesUserData(prev => [...prev, userData])
                }
            }
            setMessagesLoading(false)
        }

        console.log(messagesUsersId.size)
        if(messagesUsersId.size > 0)
            checkIfDataAvailable()
        
    }, [messagesUsersId])
    

    useEffect(() => {

        if(!user)
            return;
        
    }, [user])

    const memo = useMemo(() => ({
        messages,
        messagesUsersId,
        messagesUserData,
        setMessagesUserData,
        messagesLoading
    }),[messages, messagesUserData, messagesUsersId, messagesLoading])

    return <AppContext.Provider value={memo}>
        {children}
    </AppContext.Provider>
}


export default function useApp() {
    return useContext(AppContext);
}
