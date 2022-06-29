import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React, {useState} from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link as NavLink } from 'react-router-dom';
import useAuth from '../context/AuthContext';

function Landing() {

    const {signInPopup} = useAuth()

    return (
        <Flex direction="column">
            <Flex alignItems={'center'} justifyContent={'space-between'} mt={5} mr={5} ml={5}>
                
            <Flex direction={'column'}>
            <Heading
                fontFamily={`'Source Code Pro', sans-serif`}
                color={useColorModeValue('cyan.600', 'cyan')}
                fontSize={['20px', '24px', '28px', '30px']}
            >
                {' '}
                &lt;partnersInCrime&gt;
            </Heading>{' '}
            </Flex>

                <Flex justifyContent={'flex-end'} gap={3}>
                    <Button colorScheme={'cyan'} onClick={signInPopup}>
                        <AiOutlineGoogle />
                    </Button>
                    <ColorModeSwitcher/>
                </Flex>
            </Flex>

            <Flex mt={5}>
                hello
            </Flex>

        </Flex>
    )
}

export default Landing