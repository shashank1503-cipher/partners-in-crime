import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Link,
  Stack,
  Button,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { SiLinkedin } from 'react-icons/si';
import { GoMarkGithub } from 'react-icons/go';
import useAuth from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FaUserSecret } from 'react-icons/fa';
import Footer from './Footer';
import { FiGithub } from 'react-icons/fi';
import { Link as NavLink } from 'react-router-dom';
export default function SocialProfileWithImage() {
  let { signInPopup, error, loading } = useAuth();
  return (
    <Flex minH={'120vh'} direction={'column'} justifyContent={'space-between'}>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={5}
        boxShadow={'xl'}
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <NavLink to="/">
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
        </NavLink>
        <Flex justifyContent={'flex-end'} gap={3}>
          <IconButton
            icon={<FiGithub />}
            variant={'ghost'}
            onClick={() =>
              window.open(
                'https://github.com/shashank1503-cipher/partners-in-crime',
                '_blank'
              )
            }
          />

          <ColorModeSwitcher />
        </Flex>
      </Flex>

      <Flex
        // minH={'100vh'}
        align={'center'}
        direction={'column'}
      >
        <Heading
          fontFamily={`'Source Code Pro',sans-serif`}
          size={['2xl', '2xl']}
          my={5}
        >
          <Flex>
            Meet the OG Criminals &nbsp;{' '}
            <FaUserSecret color={'cyan'} display={'inline'} />
          </Flex>
        </Heading>
        <Flex justifyContent={'space-evenly'} wrap={'wrap'} w={'full'}>
          <Center py={6}>
            <Box
              maxW={'270px'}
              w={'full'}
              bg={useColorModeValue('#d1f0f6', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={'https://avatars.githubusercontent.com/u/72248926?v=4'}
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading
                    fontSize={'2xl'}
                    fontWeight={500}
                    fontFamily={'body'}
                  >
                    Akarsh Pandey
                  </Heading>
                  <Text color={'gray.500'}>Professional Procrastinator</Text>
                </Stack>
                <Stack direction={'row'} justify={'center'}>
                  <Center p={8}>
                    <a
                      href="https://www.linkedin.com/in/akarsh-pandey-238b471b0/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        colorScheme={'linkedin'}
                        icon={<SiLinkedin />}
                      ></IconButton>
                    </a>
                  </Center>
                  <Center p={8}>
                    <a href="https://github.com/Techocrat">
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        icon={<GoMarkGithub />}
                      ></IconButton>
                    </a>
                  </Center>
                </Stack>
              </Box>
            </Box>
          </Center>
          <Center py={6}>
            <Box
              maxW={'270px'}
              w={'full'}
              bg={useColorModeValue('#d1f0f6', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={'https://avatars.githubusercontent.com/u/54381338?v=4'}
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading
                    fontSize={'2xl'}
                    fontWeight={500}
                    fontFamily={'body'}
                  >
                    Shashank Srivastava
                  </Heading>
                  <Text color={'gray.500'}>Full Stack Developer</Text>
                </Stack>
                <Stack direction={'row'} justify={'center'}>
                  <Center p={8}>
                    <a
                      href="https://www.linkedin.com/in/shashank-srivastava-a72899201/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        colorScheme={'linkedin'}
                        icon={<SiLinkedin />}
                      ></IconButton>
                    </a>
                  </Center>
                  <Center p={8}>
                    <a href="https://github.com/shashank1503-cipher">
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        icon={<GoMarkGithub />}
                      ></IconButton>
                    </a>
                  </Center>
                </Stack>
              </Box>
            </Box>
          </Center>
          <Center py={6}>
            <Box
              maxW={'270px'}
              w={'full'}
              bg={useColorModeValue('#d1f0f6', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={'https://avatars.githubusercontent.com/u/24809324?v=4'}
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading
                    fontSize={'2xl'}
                    fontWeight={500}
                    fontFamily={'body'}
                  >
                    Bhavya Goyal
                  </Heading>
                  <Text color={'gray.500'}>Full Stack Developer</Text>
                </Stack>
                <Stack direction={'row'} justify={'center'}>
                  <Center p={8}>
                    <a
                      href="https://www.linkedin.com/in/bhavya-goyal-832418203/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        colorScheme={'linkedin'}
                        icon={<SiLinkedin />}
                      ></IconButton>
                    </a>
                  </Center>
                  <Center p={8}>
                    <a href="https://github.com/bhavyag54">
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        icon={<GoMarkGithub />}
                      ></IconButton>
                    </a>
                  </Center>
                </Stack>
              </Box>
            </Box>
          </Center>
          <Center py={6}>
            <Box
              maxW={'270px'}
              w={'full'}
              bg={useColorModeValue('#d1f0f6', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={'https://avatars.githubusercontent.com/u/78961353?v=4'}
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading
                    fontSize={'2xl'}
                    fontWeight={500}
                    fontFamily={'body'}
                  >
                    Ishaan Mahesh
                  </Heading>
                  <Text color={'gray.500'}>Full Stack Developer</Text>
                </Stack>
                <Stack direction={'row'} justify={'center'}>
                  <Center p={8}>
                    <a
                      href="https://www.linkedin.com/in/ishaan-mahesh/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        colorScheme={'linkedin'}
                        icon={<SiLinkedin />}
                      ></IconButton>
                    </a>
                  </Center>
                  <Center p={8}>
                    <a href="https://github.com/ishaan5199">
                      <IconButton
                        w={'full'}
                        mt={8}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        icon={<GoMarkGithub />}
                      ></IconButton>
                    </a>
                  </Center>
                </Stack>
              </Box>
            </Box>
          </Center>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}
