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
import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link as NavLink } from 'react-router-dom';
const Landing = () => {
  return (
    <Flex direction="column">
      <Flex justifyContent={'flex-end'} mt={5} mr={5}>
        <ColorModeSwitcher />
      </Flex>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        minH={'75vh'}
        align={'center'}
        justifyContent={'space-evenly'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Flex direction={'column'} m={10}>
          <Heading
            fontFamily={`'Source Code Pro', sans-serif`}
            color={useColorModeValue('cyan.600', 'cyan')}
            fontSize={['4xl', '4xl', '5xl', '6xl']}
          >
            {' '}
            &lt;partnersInCrime&gt;
          </Heading>{' '}
        </Flex>
        <Stack spacing={8} minW={['sm','md','md','md']} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={['3xl', '3xl', '4xl', '5xl']}
              fontFamily={`'Source Code Pro',sans-serif`}
            >
              Sign in{' '}
            </Heading>
            <Text fontSize={['sm','md','md','lg']} color={'gray.600'}>
              to start{' '}
              <Text
                display={'inline'}
                color={useColorModeValue('cyan.600', 'cyan')}
              >
                Collaborating
              </Text>{' '}
              with your college mates 👨‍💻
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'center'}
                >
                  <Text>
                    New User?{' '}
                    <Link color={useColorModeValue('cyan.600', 'cyan')}>
                      <NavLink to={'/signup'}> Sign Up</NavLink>
                    </Link>
                  </Text>
                </Stack>
                <Button colorScheme={'cyan'}>Sign in</Button>
                <Flex align="center">
                  <Divider />
                  <Text padding="2">or</Text>
                  <Divider />
                </Flex>
                <Button leftIcon={<AiOutlineGoogle />} colorScheme={'cyan'}>
                  Sign in with Google
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Landing;
