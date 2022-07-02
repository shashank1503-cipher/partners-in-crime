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
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

import { FaSearch } from 'react-icons/fa';
import ChatMessage from './ChatMessage';


const sampleData = [
  {
    id:1,
    name: "Bhavya",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "35 minutes ago"
  },
  {
    id:2,
    name: "Bhavya goyal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "2 days ago"
  },
  {
    id:3,
    name: "shaw",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "2 days ago"
  },
  {
    id:4,
    name: "ak",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "5 days ago"
  },
  {
    id:5,
    name: "mittal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "2 weeks ago"
  },
  {
    id:6,
    name: "mittal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "1 hour ago"
  },
  {
    id:7,
    name: "mittal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png",
    timeStamp: "12 minutes ago"
  },
]

const mess = {
  user: 1,
  mess: [
    {
      
      mess: "wfewwfwkf",
      time: "12:06"
    }
  ]

}


const Message = ({name, lastMessage,timeStamp ,photoURL, id, select, setSelected}) => {

    const b = (select === id)
 
    return (
      <Flex 
        alignItems={"center"}
        gap={5}
        position={'relative'}

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
        <Avatar size={"sm"} src={`${photoURL}`}/>
        <Flex direction={"column"}>
          <Box fontSize={18}>{name}</Box>
          <Text 
            fontSize={14} 
            color="gray.500"
          >{lastMessage}</Text>
        </Flex>

        <Text 
          fontSize={12} 
          position={'absolute'}
          color={useColorModeValue('gray.400', "gray.500")}
          right={2}
          top={2}
        >{timeStamp}</Text>
      </Flex>
    )

}

const Messages = () => {

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(-1)
  const data = sampleData

  return (
    
    <Flex
      height={'calc(100vh - 100px)'}
      position={'relative'}
      overflow={"hidden"}
      marginLeft={-4}
      marginTop={-4}
      marginRight={-4}
      flexDirection={"row"}
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200",'gray.700')}
    >

      <Flex direction={'column'}>
        <Flex direction={"row"} alignItems={"center"}
              px={3}  
              borderBottom={"1px"}
              borderRight={"1px"}
              borderColor={useColorModeValue("gray.200",'gray.700')}
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
        borderRight='1px'
        borderColor={useColorModeValue("gray.200",'gray.700')}
        overflow={"overlay"}
          
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
          
          {data.map(d => 
            <Message 
            name={d.name} 
            lastMessage={d.lastMessage}
            timeStamp={d.timeStamp}
            photoURL={d.photoURL}
            id={d.id}
            select={selected}
            setSelected = {setSelected}
            />
            )}

      </Flex>
      </Flex>
        <ChatMessage />
    </Flex>
  )
}

export default Messages