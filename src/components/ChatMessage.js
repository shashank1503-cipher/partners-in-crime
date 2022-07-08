import {
    Box,
    Button,
    Collapse,
    Flex,
    Avatar,
    FormControl,
    FormLabel,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuList,
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
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {FaEllipsisV, FaPaperPlane} from 'react-icons/fa'
import useApp from '../context/AppContext';
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
            justifyContent={'space-between'}
            alignItems="center"
            role={'group'}
            
        >
            <Text>{message}</Text>
            {/* <Box
                opacity={0}
                zIndex={-1}
                _groupHover={{
                    opacity: 1,
                    zIndex: 1
                }}
            >

            <FaEllipsisV 
                cursor={'pointer'}
                fontSize={10}
            />
            </Box> */}
        </Flex>
    )

}

function ChatMessage({messages, userData}) {

    const {user} = useAuth()
    const [chatMes, setChatMes] = useState("")
    const [message, setMessage] = useState([])
   
    useEffect(() => {
        setMessage([...messages.messagesArray])
        setTimeout(() => scroll(), 0)
    }, [messages])

    // const deleteChat = async () => {
        
    //     messages.map(m => {
    //         deleteDoc(doc(db, 'chats',m.id))
    //     })


    // }

    useEffect(() => {

        const updateMes = async (id) => {
            console.log(id)
            const ref = doc(collection(db, 'chats'), id)
            const res = await updateDoc(ref, {visited: true})
        }

        if(message.length > 0);

            message.map(m => {
                if(m.visited === false)
                {
                    updateMes(m.id)
                }
            })

    }, [message])

    
    const postMessage = async () => {

        let messs = chatMes
        messs = messs.trim()
        if(messs.length <= 1)
            return
        
        setChatMes("");
        const mes = {
            message: messs,
            sender: user.g_id,
            users: [userData[0].g_id, user.g_id],
            timeStamp: new Date(),
            visited: false
        }

        await addDoc(collection(db, 'chats'), {
            ...mes
        })


    }

    const scroll = () => {
        const m = document.getElementById('messageBox')
        console.log("Running...")
        m?.scrollTo({
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
                <Avatar src={userData[0]?.photo || null}/>
                <Text fontSize={16} flex={1}>{userData[0]?.name}</Text>
                {/* <Menu>
                    <MenuButton
                    >
                        <FaEllipsisV cursor={'pointer'}/>
                    </MenuButton>

                    <MenuList>
                        <MenuItem onClick={() => deleteChat(userData[0].g_id)}>Delete</MenuItem>
                    </MenuList>
                </Menu> */}
                
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

                {message.map(m => <Mes who={m.who} key={m.id} message={m.message}/>)}
            </Flex>

            <Flex 
                direction={'row'}
                alignItems="center"
                px={4}
                py={1}
                gap={2}
                boxShadow={'xs'}
            >
                <Input
                    borderWidth={1}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    focusBorderColor="none"
                    value={chatMes}
                    onChange={e => setChatMes(e.target.value)}
                    onKeyDown={e => e.code==="Enter"?postMessage():null}
                    
                />
                <Box background={'cyan.600'} color={'white'} p={2} borderRadius={"50%"}
                    cursor={'pointer'} onClick={() => postMessage()}
                >
                    <FaPaperPlane/>
                </Box>
            </Flex>
        </Flex>
    )
}

export default ChatMessage