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
  useColorModeValue,
} from '@chakra-ui/react';
import { SiLinkedin } from 'react-icons/si';
import { GoMarkGithub } from 'react-icons/go';
export default function SocialProfileWithImage() {
  return (
    <Flex
      wrap={'wrap'}
      justifyContent={'space-evenly'}
      minH={'100vh'}
      align={'center'}
    >
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
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
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                Akarsh Pandey
              </Heading>
              <Text color={'gray.500'}>Professional Procastinator</Text>
            </Stack>
            <Stack direction={'row'} justify={'center'}>
              <Center p={8}>
                <a
                  href="https://www.linkedin.com/in/akarsh-pandey-238b471b0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    color={'blue'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<SiLinkedin />}
                  ></Button>
                </a>
              </Center>
              <Center p={8}>
                <a href="https://github.com/Techocrat">
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<GoMarkGithub />}
                  ></Button>
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
          bg={useColorModeValue('white', 'gray.800')}
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
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
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
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    color={'blue'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<SiLinkedin />}
                  ></Button>
                </a>
              </Center>
              <Center p={8}>
                <a href="https://github.com/shashank1503-cipher">
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<GoMarkGithub />}
                  ></Button>
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
          bg={useColorModeValue('white', 'gray.800')}
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
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
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
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    color={'blue'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<SiLinkedin />}
                  ></Button>
                </a>
              </Center>
              <Center p={8}>
                <a href="https://github.com/bhavyag54">
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<GoMarkGithub />}
                  ></Button>
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
          bg={useColorModeValue('white', 'gray.800')}
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
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
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
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    color={'blue'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<SiLinkedin />}
                  ></Button>
                </a>
              </Center>
              <Center p={8}>
                <a href="https://github.com/ishaan5199">
                  <Button
                    w={'full'}
                    mt={8}
                    bg={useColorModeValue('#151f21')}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    leftIcon={<GoMarkGithub />}
                  ></Button>
                </a>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    </Flex>
  );
}
