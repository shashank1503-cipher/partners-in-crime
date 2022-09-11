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
  useMediaQuery,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import { FacebookAuthProvider } from 'firebase/auth';
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

const Message = ({name, photo, lastMessage,lastMessageSender,id, select, navi, newMessages}) => {

    const b = (select === id)
  
    return (
      <Flex 
        alignItems={"center"}
        gap={5}
        w={'full'}
        minW={250}
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
        py={3}
        cursor="pointer"
        position={'relative'}
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
        {newMessages > 0?
        <Flex 
          position={"absolute"}
          right={4}
          top={6}
          w={6}
          h={6}
          textAlign={'center'}
          alignItems={'center'}
          justifyContent={'center'}
          background={'cyan.700'}
          borderRadius={12}
          fontSize={'18px'}
          fontWeight={500}
        >{newMessages}</Flex>
        :<></>
        }
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
  const [searchAddUserData, setSearchAddUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fetchBool, setFetchBool] = useState(true)
  const [messageWhileFetching, setMessageWhileFetching] = useState(1)
  const Ref = useRef(null)

  const [width] = useMediaQuery('(max-width: 769px)')
  const [selected, setSelected] = useState(-1)

  const color = useColorModeValue("gray.200",'gray.700')

  const fetchSuggestions = async (search = "",skip = 0) => {
    setFetchLoading(true)

    let res;
    
    if(search === "" && fetchBool)
    {
      res = await fetch(`https://partners-in-crime-backend-production.up.railway.app/users/data?skip=${skip}`, {
        headers:{
          authentication: `Bearer ${token}`
        }
      })

      res = await res.json()

      if(res.data.length === 0)
      {
        setFetchBool(false)
        setMessageWhileFetching(0)
      }

      let usersData = await res.data.filter(p => p.g_id !== user.g_id)
      setAddUserData(p => [...new Map(Array.from([...p, ...usersData]).map(m => [m['g_id'], m])).values()])
      setFetchLoading(false)

    }

    else
    {
      res = await fetch(`https://partners-in-crime-backend-production.up.railway.app/searchmessage?q=${search}`,{
        headers:{
          authentication: `Bearer ${token}`
        }
      })
      res = await res.json()
      // console.log(res)
      let usersData = await res.data.filter(p => p.g_id !== user.g_id)
      setSearchAddUserData([...usersData])
      setFetchLoading(false)

    }
  }

 
  useEffect(() => {

    setSearch("")
    if(conDrawer)
    {
      fetchSuggestions()
    }


  }, [conDrawer])

  useEffect(() => {
    
    if(!conDrawer)
      if(search.length > 0)
      {
          let new_data = []
          messagesUserData.map(d => {
            if(d.name.toLowerCase().includes(search.toLowerCase()))
              new_data.push(d)
          })

          setData([...new_data])
      }
      else
        setData([...messagesUserData])
    
    else
    {
        if(search.trim().length > 1)
        {
          fetchSuggestions(search);
        }
        
    }
    
  }, [search])

  useEffect(() => {
    if((messagesUserData.length > 0))
      setData([...messagesUserData])

    if((messagesUserData.length > 0))
    {
        let ud = messagesUserData.map(m => ({
          ...m,
          timeStamp: {...messages[m.g_id]?.messagesArray.slice(-1)[0].timeStamp},
          newMessages: messages[m.g_id]?.newMessages
        }))
        
        ud.sort(function(x, y){
          return x.newMessages > y.newMessages
        })
          
        
        setMessagesUserData(ud)
    }

  }, [messages])

  const NaviToChat = (id) => {
    setSearch("")
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

    setData(messagesUserData)

  }, [messagesUserData])


  useEffect(() => {

    if(params.get('chat'))
      setSelected(params.get('chat'))

  }, [params])

  const UpdateMessagesUserData = async (id) => {
    setLoading(true)
    let userData = {}
    let data = await fetch("https://partners-in-crime-backend-production.up.railway.app/auth/getUser", {
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
    console.log(userData)
    let datad = [...messagesUserData, userData]
    setMessagesUserData(datad)
    setLoading(false)

  }

  return (

      <Flex
        height={"calc(100vh - 80px)"}
        overflow={"hidden"}
        position={'relative'}
        flexDirection={"row"}
        borderBottom="1px"
        borderColor={color}
      >

        {selected === -1 || !width?
        <Flex direction={'column'}
          height={'full'}
          position={'relative'}
          borderRight='1px'
          borderColor={color}
          // transition={'all 0.25s ease'}
          // w={{base:"100vw", md:'full'}}
          w={width?'full':'auto'}

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

          </Flex>

          <Button m={2} onClick={() => setConDrawer(!conDrawer)}>{conDrawer?<Box py={2}><FaArrowLeft fontSize={'20px'}/></Box>:"Start a Conversation"}</Button>

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
            onScroll={e => search.length === 0?
              parseInt(e.target.scrollHeight)-10 <= parseInt(parseInt(e.target.scrollTop)+parseInt(e.target.clientHeight))?fetchSuggestions("", addUserData.length+1)
              :null
              :console.log(search.length)
            }
            // onScroll = {e => console.log(e.target.scrollHeight)}
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
                  newMessages = {messages[d.g_id]?.newMessages}
                />
              )}


              {conDrawer && search.length === 0?addUserData.length ===0?"":addUserData.map(d => 
                <Message
                  name={d?.name}
                  photo={d?.photo}
                  id={d?.g_id}
                  key={d?.g_id}
                  navi={NaviToChat}
                />
              ):<></>}

              {conDrawer && search.length > 0?searchAddUserData.length === 0?"":searchAddUserData.map(d => (
                <Message
                  name={d?.name}
                  photo={d?.photo}
                  id={d?.g_id}
                  key={d?.g_id}
                  navi={NaviToChat}
                />
                ))
                :console.log(search.length)
              }

              {fetchLoading && conDrawer?<Box
                w={"full"}
                minW={250}
                h={'40px'}
                fontSize={"18px"}
                m="auto"
                textAlign={'center'}
                // background={'cyan.700'}
              >
                {messageWhileFetching===1?<Logo fontSize={"2xl"}/>:""}
              </Box>:<></>}


          </Flex>
          

        </Flex>
        :<></>}

        
        {!width || selected !== -1?
        <Flex 

          justifyContent={loading?'center':""} 
          alignItems={loading?'center':""} 
          w={'full'}
          h={'full'}

          // background={'red'}
        >
              {loading?<Logo fontSize={'7xl'}></Logo>
              :<></>
              }
              {selected === -1 || loading? <></>:
              <ChatMessage 
              messages={messages[selected]?messages[selected]:{messagesArray:[]}}
              userData={messagesUserData.filter(m => m.g_id === selected)}
              setSelected={setSelected}
              />
              }
        </Flex>
        :
        <></>}

      </Flex>

  
  )
}

export default Messages