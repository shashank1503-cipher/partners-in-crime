import React, {createContext, useMemo, useContext, useState, useEffect} from 'react';
import useAuth from './AuthContext';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';


const AppContext = createContext({})

export const AppProvider = ({children}) => {

    const {user, token} = useAuth()

    const [messages, setMessages] = useState({})
    const [messagesUsersId, setMessagesUsersId] = useState(new Set())
    const [messagesUserData, setMessagesUserData] = useState([])
    const [messagesLoading, setMessagesLoading] = useState(true)
    const colRef = collection(db, 'chats')

    let myq;

    function beep() {
        var snd = new Audio("");  
        snd.play();
    }

    const getMessages = async () => {

        setMessagesLoading(true)
        if(user)
        {
            myq = query(colRef, where("users", 'array-contains', user?.g_id), orderBy('timeStamp'))
            onSnapshot(myq, snapshot => {
                // console.log("Hekki")
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
                                messagesArray: [],
                                newMessages: 0
                            }
                        }
                    }

                    mess[otherUserId].messagesArray.push({
                        message: data.message,
                        who: data.sender===user.g_id?1:0,
                        id: doc_id,
                        visited: data?.visited,
                        timeStamp: data.timeStamp
                    })
                    if(data?.visited === false && data?.sender !== user.g_id)
                        mess[otherUserId].newMessages++;
                })

                setMessages(mess)
            })
        }

        setMessagesLoading(false)

    }


    useEffect(() => {
        if(user)
        {
            getMessages()
        }
    }, [user])



    useEffect(() => {

        if(messagesUsersId.length === 0)
        setMessagesLoading(false)

        
        const checkIfDataAvailable = async () => {


            for(let id of messagesUsersId)
            {
                let userData = {}
                if(messagesUserData.filter(m => m.g_id === id).length === 1)
                {
                    
                }
                else
                {
                    let data = await fetch(`https://lxuwymtrux3fuvgvqxvackkcvq0alfqf.lambda-url.ap-south-1.on.aws/auth/getUser`, {
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
                    setMessagesUserData(prev => [...new Map(Array.from([...prev, userData]).map(m => [m['g_id'], m])).values()])
                    // setMessagesUserData(prev => [...prev, userData])
                }
            }
            setMessagesLoading(false)
        }

        // console.log(messagesUsersId.size)
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
