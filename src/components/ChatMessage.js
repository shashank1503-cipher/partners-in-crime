import { 
    Flex, 
    Avatar,
    Text,
    Box,
    Input,
    useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react'
import useAuth from '../context/AuthContext'
import { FaEllipsisV, FaPaperPlane} from 'react-icons/fa';


const Mess = ({how, message}) => {

    return (
        <Box
            background={useColorModeValue('gray.200', 'gray.700')}
            position={'relative'}
            px={3}
            py={1}
            maxW={"70%"}
            alignSelf={how===1?'flex-end':"flex-start"}
            borderRadius={10}
            boxShadow={'xl'}
        >
            <Text 
                position={'relative'}
            >{message}</Text>
        </Box>
    )

}

function ChatMessage(props) {

    const {user} = useAuth()
    const [message, setMessage] = useState("");
    // const userData = props.userData;
    const userData = {
        photo: "",
        name: "Bhavya"
    }
    const messages = props.messages;

    return (
        <Flex direction={"column"} position={'relative'} w={'full'}>

            <Flex
                alignItems={"center"}
                direction={"row"}
                gap={5}
                p={2}
                boxShadow={'xl'}
                w={'full'}
                px={7}
                justifyContent={'space-around'}
            >

                <Avatar src={userData.photo}/>
                <Text fontSize={24} flex={1}>{userData.name}</Text>

                <Box cursor={'pointer'}>
                    <FaEllipsisV/>    
                </Box>

            </Flex>

            <Flex
                flex={1}
                direction={'column'}
                overflow={'hidden'}
            >
                <Flex 
                    overflowY={'scroll'}
                    overflowX={'hidden'}
                    h={'full'}
                    w={'full'}
                    gap={1}
                    direction={'column'}
                    p={2}
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

                    position="relative"
                >
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwe"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwewfwhbfw wfhgw fwwyufgw ufiw heloo"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwe"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwewfwhbfw wfhgw fwwyufgw ufiw heloo"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwe"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwewfwhbfw wfhgw fwwyufgw ufiw heloo"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwe"}/>
                    <Mess how={1} message={"febewffbhlfwe"}/>
                    <Mess how={0} message={"febewffbhlfwewfwhbfw wfhgw fwwyufgw ufiw heloo"}/>
                </Flex>
            </Flex>

            <Flex 
                direction={"row"} alignItems={"center"}
                p={2}
                px={4}
                gap={2}
                borderTop={"1px"}
                borderColor={useColorModeValue("gray.200",'gray.700')}
                
            >
              <Input 
                borderWidth={1}
                borderColor={useColorModeValue("gray.200",'gray.700')}
                borderRadius={10}
                focusBorderColor="none"
                boxShadow={'xl'}
                onChange={(e) => setMessage(e.target.value)}
              />

            <Box cursor={'pointer'}>
                <FaPaperPlane/>
            </Box>

        </Flex>

        </Flex>
    )
}

export default ChatMessage