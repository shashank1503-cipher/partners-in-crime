import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React, {useEffect, useState} from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link as NavLink } from 'react-router-dom';
import useAuth from '../context/AuthContext';


function Messages() {

  const {user} = useAuth()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    setPhoto(user.photoURL)
  }, [user])

  return (
    <Flex direction="column" mt={5} ml={5} mr={5}>
      <Flex direction="row" justifyContent={'space-between'} alignItems="center">
        <Flex>
          <Heading
              fontFamily={`'Source Code Pro', sans-serif`}
              color={useColorModeValue('cyan.600', 'cyan')}
              fontSize={['20px', '24px', '28px', '30px']}
          >
              &lt;partnersInCrime&gt;
          </Heading>
        </Flex>

        <Flex justifyContent={'flex-end'}>
            <Box boxSize={10} background="red" overflow={"hidden"} borderRadius={20}>
              <Image src={photo || '../../public/profile.png'}/>
            </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Messages