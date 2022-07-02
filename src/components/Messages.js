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
import React, { useEffect, useState } from 'react'

import { FaSearch } from 'react-icons/fa';
import useApp from '../context/AppContext';
import ChatMessage from './ChatMessage';
import Logo from './Logo';

const Message = ({name, photo, lastMessage,lastMessageSender,id, select, setSelected}) => {

    const b = (select === id)
    console.log(lastMessage)

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
        
        onClick={() => setSelected(id)}
      >
        <Avatar size={"sm"} src={photo || null}/>
        <Flex direction={"column"}>
          <Box fontSize={18}>{name.substring(0,10)}</Box>
          <Text 
            fontSize={14} 
            color="gray.500"
          >{lastMessageSender}: {lastMessage}</Text>
        </Flex>
      </Flex>
    )

}

const Messages = () => {

  const {messagesUsersId, messagesUserData, messages, messageLoading} = useApp()
  const [mainData, setMainData] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")

  const [selected, setSelected] = useState(-1)

  const color = useColorModeValue("gray.200",'gray.700')

  useEffect(() => {
  
    if(search.length > 0)
    {
        let new_data = []
        data.map(d => {
          if(d.name.toLowerCase().includes(search))
            new_data.push(d)
        })

        setData([...new_data])
    }
    else
      setData([...mainData])
    
  }, [search])

  useEffect(() => {

  }, [messagesUserData, messagesUsersId])

  // useEffect(() => {
  //   console.log(selected)
  // }, [selected])

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
                  borderRadius={0}
                  focusBorderColor="none"
                  onChange={(e) => setSearch(e.target.value)}
                />

          </Flex>

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
              > 
              
              {messagesUserData?.map(d =>
                <Message 
                  name={d.name} 
                  lastMessage={messages[d.g_id].messagesArray.slice(-1)[0].message} 
                  lastMessageSender={messages[d.g_id].messagesArray.slice(-1)[0].who === 1?"You":d.name}
                  photo={d.photo}
                  id={d.g_id}
                  key={d.g_id}
                  select={selected}
                  setSelected = {setSelected}
                />
              )}

          </Flex>
          

        </Flex>

        <Flex 

          justifyContent={selected===-1?'center':""} 
          alignItems={selected===-1?'center':""} 
          w={'full'}
          h={'full'}
        >
              {selected === -1?<Logo 
                fontSize="5xl"
              />:
                <ChatMessage 
                    messages={messages[selected]}
                    userData={messagesUserData.filter(m => m.g_id === selected)}
                />
            }
        </Flex>

      </Flex>

  
  )
}

export default Messages