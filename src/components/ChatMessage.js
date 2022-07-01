import React from 'react'
import useAuth from '../context/AuthContext'

function ChatMessage(props) {

    const { text, uid, photoURL } = props.message;

    const {user} = useAuth()

    const messageClass = uid === user.User.g_id ? 'sent' : 'received';

    return (
        <>
            <div><img src={photoURL}/></div>
            <p>{text}</p>
        </>
    )
}

export default ChatMessage