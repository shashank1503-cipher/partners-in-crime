import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link as NavLink } from 'react-router-dom';
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={'100vh'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      direction={'column'}
    >
      <Flex justifyContent={'flex-end'} mt={5} mr={5}>
        <ColorModeSwitcher />
      </Flex>
      <Flex align={'center'} justify={'center'} direction={'column'}>
        <Heading
          fontFamily={`'Source Code Pro', sans-serif`}
          color={useColorModeValue('cyan.600', 'cyan')}
          fontSize={['4xl', '4xl', '5xl', '5xl']}
        >
          {' '}
          &lt;partnersInCrime&gt;
        </Heading>{' '}
        <Stack
          spacing={8}
          mx={'auto'}
          minW={['sm', 'md', 'md', 'md']}
          maxW={'lg'}
          py={12}
          px={6}
        >
          <Stack align={'center'}>
            <Heading
              fontSize={['3xl', '3xl', '4xl', '5xl']}
              textAlign={'center'}
            >
              Sign up
            </Heading>
            <Text fontSize={['sm', 'md', 'md', 'lg']} color={'gray.600'}>
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
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="batch" isRequired>
                <FormLabel>Batch</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <NavLink to="/signup2">
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                </NavLink>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link color={'blue.400'}>
                    <NavLink to={'/'}>Login</NavLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
}
