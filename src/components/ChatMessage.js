import {
    Box,
    Button,
    Collapse,
    Flex,
    Avatar,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Image,
    useColorModeValue,
    useDisclosure,
    Icon,
    Textarea
} from '@chakra-ui/react';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {FaEllipsisV, FaPaperPlane} from 'react-icons/fa'
import useAuth from '../context/AuthContext'
import { db } from '../firebase';

const Mes = ({message, who}) => {

    return (
        <Flex
            position={'relative'}
            display={'inline-flex'}
            boxShadow={'sm'}
            background={useColorModeValue('rgba(0,0,0, 0.05)', 'rgba(255,255,255, 0.2)')}
            alignSelf={who?'flex-end':'flex-start'}
            px={2}
            py={1}
            maxW={"70%"}
            borderRadius={10}
            
        >
            <Text>{message}</Text>
        </Flex>
    )

}

function ChatMessage({messages, userData}) {

    const {user} = useAuth()
    const [chatMes, setChatMes] = useState("")
    const [message, setMessage] = useState([...messages.messagesArray])
    
    useEffect(() => {
        setMessage([...messages.messagesArray])
    }, [messages])



    const postMessage = async () => {

        const mes = {
            message: chatMes,
            sender: user.g_id,
            users: [userData[0].g_id, user.g_id],
            timeStamp: new Date()
        }

        
        
        await addDoc(collection(db, 'chats'), {
            ...mes
        }) 

        setChatMes("")
        scroll()
    }

    const scroll = () => {
        const m = document.getElementById('messageBox')
        
        m.scrollTo({
            top: (m.scrollHeight),
            behavior: 'smooth'
        })
    }

    return (
        <Flex
            direction={"column"}
            w={'full'}
        >
            <Flex
                direction={"row"}
                alignItems={'center'}
                gap={3}
                px = {4}
                py={1}
                boxShadow={'xl'}
            >
                <Avatar src={userData[0].photo || null}/>
                <Text fontSize={16} flex={1}>{userData[0].name}</Text>
                <FaEllipsisV cursor={'pointer'}/>
                
            </Flex>

            <Flex
                flex={1}
                direction={'column'}
                position="relative"
                p={2}
                gap={1}
                overflowY={'auto'}
                overflowX={'hidden'}
                id={'messageBox'}

                sx={{
                    '&::-webkit-scrollbar': {
                      width: '3px',
                      backgroundColor: "transparent",
                      zIndex:10
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: "gray.500",
                    },
                }}
            >

                {message.map(m => <Mes who={m.who} message={m.message}/>)}
            </Flex>

            <Flex 
                direction={'row'}
                alignItems="center"
                px={4}
                py={1}
                gap={2}
            >
                <Input
                    borderWidth={1}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    focusBorderColor="none"
                    value={chatMes}
                    onChange={e => setChatMes(e.target.value)}
                />
                <FaPaperPlane  cursor={'pointer'} onClick={() => postMessage()}/>
            </Flex>
        </Flex>
    )
}

export default ChatMessage