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
  Icon
} from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'

import { FaSearch, FaCheckDouble, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import useApp from '../context/AppContext';
import useAuth from '../context/AuthContext';
import { db } from '../firebase';
import ChatMessage from './ChatMessage';
import Logo from './Logo';

const Message = ({name, photo, lastMessage,lastMessageSender,id, select, navi}) => {

    const b = (select === id)
  
    return (
      <Flex 
        alignItems={"center"}
        gap={5}

        _dark={{
          _hover:{
            background: "gray.700"
          },
          background: b?"gray.700":null
        }}
        

        _light={{
          _hover:{
            background: "gray.100"
          },
          background: b?"gray.100":null
        }}
        pl={5}
        w={250}
        py={3}
        cursor="pointer"

        onClick={() => navi(id)}
      >
        <Avatar size={"sm"} src={photo || null}/>
        <Flex direction={"column"}>
          <Box fontSize={18}>{name.charAt(0).toUpperCase()}{name?.split(" ")[0].slice(1).toLowerCase()}</Box>
          <Text 
            fontSize={14} 
            color="gray.500"
            display={'flex'}
            alignItems={"center"}
            gap={2}
          >{lastMessageSender} {lastMessage}</Text>
        </Flex>
      </Flex>
    )

}

const Messages = () => {


  const navigate = useNavigate()
  const [params] = useSearchParams()
  const {messagesUserData, messages, setMessagesUserData} = useApp()
  const {token, user} = useAuth()
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [conDrawer, setConDrawer] = useState(false)
  const [addUserData, setAddUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const Ref = useRef(null)

  const [selected, setSelected] = useState(-1)

  const color = useColorModeValue("gray.200",'gray.700')

  const fetchSuggestions = async () => {
    let res = await fetch(`https://partners-in-crime-backend.herokuapp.com/users/data`)
    
    res = await res.json()
    console.log(res.data)

      let usersData = res.data.filter(p => p.g_id !== user.g_id)
      setAddUserData([...usersData, 

      ])

  }

  useEffect(() => {

    if(conDrawer)
    {
      fetchSuggestions()
    }

  }, [conDrawer])

  // useEffect(() => {

  //   console.log(Ref.current.scrollHeight)
  // }, [Ref.current.scrollHeight])

  useEffect(() => {

    console.log(addUserData)

  }, [addUserData])

  useEffect(() => {
    
    if(!conDrawer)
      if(search.length > 0)
      {
          let new_data = []
          messagesUserData.map(d => {
            if(d.name.toLowerCase().includes(search))
              new_data.push(d)
          })

          setData([...new_data])
      }
      else
        setData([...messagesUserData])
    
    else
    {
      
        
    }
    
  }, [search])

  useEffect(() => {
    
    if((messagesUserData.length > 0))
      setData([...messagesUserData])

  }, [messagesUserData])

  const NaviToChat = (id) => {
    setConDrawer(false)
    navigate({
      pathname: "/messages",
      search: `?chat=${id}`
  })
}

  useEffect(() => {
    console.log(selected)
    if(selected !== -1)
    {
        if(messagesUserData.filter(m => m.g_id === selected).length === 1)
        {
            console.log("YESS", selected)
        }
        else
        {
          UpdateMessagesUserData(selected)
        }
    }
  
  }, [selected])


  useEffect(() => {

    if(params.get('chat'))
      setSelected(params.get('chat'))

  }, [params])

  const UpdateMessagesUserData = async (id) => {
    setLoading(true)
    let userData = {}
    let data = await fetch("https://partners-in-crime-backend.herokuapp.com/auth/getUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          g_id: id
      })
    })

    data = await data.json()

    userData = {...data.user}
    
    setMessagesUserData(prev => [...prev, userData])
    setLoading(false)

  }

  return (

      <Flex
        height={"calc(100vh - 80px)"}
        overflow={"hidden"}
        position={'relative'}
        marginLeft={-4}
        marginTop={-4}
        marginRight={-4}
        marginBottom={-4}
        flexDirection={"row"}
        borderBottom="1px"
        borderColor={color}
      >

        <Flex direction={'column'}
          height={'full'}
          position={'relative'}
          borderRight='1px'
          borderColor={color}
          
        >
          <Flex direction={"row"} alignItems={"center"}
                px={3}  
                borderBottom={"1px"}
                borderRight={"1px"}
                borderColor={color}
              >
                <FaSearch />
                <Input 
                  border="none"
                  placeholder="Search"
                  borderRadius={0}
                  focusBorderColor="none"
                  onChange={(e) => setSearch(e.target.value)}
                />

          </Flex>

          <Button m={2} onClick={() => setConDrawer(!conDrawer)}>{conDrawer?<FaArrowLeft/>:"Start a Conversation"}</Button>

          <Flex
            direction={"column"}
            overflow={"overlay"}
            w={'full'}
              
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

            ref={Ref}
            onScroll={e => e.target.scrollHeight < (e.target.scrollTop+e.target.clientHeight)?"":console.log("NO")}

          > 
              
              
              {!conDrawer && data.map(d =>
                <Message
                  name={d.name} 
                  lastMessage={messages[d.g_id]?.messagesArray.slice(-1)[0].message} 
                  lastMessageSender={messages[d.g_id]?.messagesArray.slice(-1)[0].who === 1?<FaCheckDouble/>:""}
                  photo={d.photo}
                  id={d.g_id}
                  key={d.g_id}
                  select={selected}
                  navi={NaviToChat}
                />
              )}


              {conDrawer?addUserData.length ===0?"No Data":addUserData.map(d => 
                <Message
                  name={d.name}
                  photo={d.photo}
                  id={d.g_id}
                  key={d.g_id}
                  navi={NaviToChat}
                />
              ):<></>}


          </Flex>
          

        </Flex>

        <Flex 

          justifyContent={loading?'center':""} 
          alignItems={loading?'center':""} 
          w={'full'}
          h={'full'}
        >
              {loading?<Logo fontSize={'7xl'}></Logo>
              :<></>
            }
            {selected === -1 || loading? <></>:
              <ChatMessage 
              messages={messages[selected]?messages[selected]:{messagesArray:[]}}
              userData={messagesUserData.filter(m => m.g_id === selected)}
              />
            }
        </Flex>

      </Flex>

  
  )
}

export default Messages