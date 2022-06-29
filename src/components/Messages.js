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
import React from 'react'
import { FaSearch } from 'react-icons/fa';


const sampleData = [
  {
    name: "Bhavya",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
  {
    name: "Bhavya goyal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
  {
    name: "shaw",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
  {
    name: "ak",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
  {
    name: "mittal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
  {
    name: "mittal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
  {
    name: "mittal",
    lastMessage: "fdfdkjlelflew",
    photoURL: "../../public/profile.png"
  },
]

const Message = ({name, lastMessage, photoURL}) => {

    console.log(name)

    return (
      <Flex 
        alignItems={"center"}
        gap={5}

        _dark={{
          _hover:{
            background: "gray.700"
          }
        }}

        _light={{
          _hover:{
            background: "gray.100"
          }
        }}
        pl={5}
        w={250}
        py={3}
        cursor="pointer"
      >
        {/* <Box>
          <Image src={"../../public/profile.png"}/>
        </Box> */}
        <Avatar size={"sm"} src={`${photoURL}`}/>
        <Flex direction={"column"}>
          <Box fontSize={18}>{name}</Box>
          <Text 
            fontSize={14} 
            color="gray.500"
          >{lastMessage}</Text>
        </Flex>
      </Flex>
    )

}

const Messages = () => {
  return (
    
    <Flex
      height={"82vh"}
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
              />

        </Flex>

      <Flex 
        direction={"column"}
        borderRight='1px' 
        borderColor={useColorModeValue("gray.200",'gray.700')}
        overflow={"overlay"}
        css={{
          // '&::-webkit-scrollbar': {
            //   width:"20px",
            //   color: "red"
            // }
          }}
          
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
          
          {sampleData.map(d => 
            <Message 
            name={d.name} 
            lastMessage={d.lastMessage} 
            photoURL={d.photoURL} 
            />
            )}

      </Flex>
      </Flex>
    </Flex>
  )
}

export default Messages