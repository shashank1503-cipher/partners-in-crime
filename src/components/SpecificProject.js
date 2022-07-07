import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiHeart, FiMail } from 'react-icons/fi';
import useAuth from '../context/AuthContext';
import Logo from './Logo';

const SpecificProject = ({ id }) => {
  const [data, setData] = useState({});
  const [isUserInterested, setIsUserInterested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let { token } = useAuth();
  let toast = useToast();
  let fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/project/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        let json = await res.json();
        setData(json.data);
        // console.log(data);
        // console.log(json.data.is_user_interested)
        setIsUserInterested(json.data.is_user_interested);
        setError(null);
      } else {
        const json = await res.json();
        setError(json.detail);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let addInterested = async () => {
    let url = `http://127.0.0.1:8000/addfavourite`;
    let data = {
      project_id: id,
    };
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        let json = await response.json();

        setIsUserInterested(true);
      } else {
        let json = await response.json();

        toast({
          title: 'Error',
          description: `${json.detail} - ${response.status}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: `Something went wrong - ${e}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  let removeInterested = async () => {
    let url = `http://127.0.0.1:8000/deleteFavourite/${id}?is_project=${true}`;
    try {
      let response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        let json = await response.json();

        setIsUserInterested(false);
      } else {
        toast({
          title: 'Error',
          description: `Something went wrong - ${response.status}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: `Something went wrong - ${e}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  let linkColor = useColorModeValue('cyan.600', 'cyan');
  let badgeBG = useColorModeValue('gray.50', 'gray.600');
  return (
    <Flex direction={'column'}>
      {isLoading ? (
        <Flex minH={'100vh'} justifyContent={'center'} align={'center'}>
          <Logo fontSize={'4xl'} />
        </Flex>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Flex
            boxShadow={'2xl'}
            rounded={'md'}
            borderColor={'gray.200'}
            direction={['column', 'column', 'column', 'row']}
          >
            <Box
              pos={'relative'}
              maxW={['100%', '100%', '50%', '50%']}
              minW={['100%', '100%', '50%', '50%']}
            >
              <Image
                src={data.hero_image}
                maxH={'lg'}
                roundedTopLeft={'md'}
                roundedBottomLeft={'md'}
              />
            </Box>
            <Flex
              direction={'column'}
              w={['100%', '100%', '50%', '50%']}
              minH={['md', 'md', 'md', 'md']}
              p={5}
              justifyContent={'space-evenly'}
            >
              <Heading
                textAlign={'center'}
                fontFamily={`'Source Code Pro',sans-serif`}
                color={linkColor}
                m={2}
              >
                {data.title}
              </Heading>
              <Text textAlign={'center'} fontSize={'lg'}>
                {data.description}
              </Text>
              <ButtonGroup justifyContent={'space-evenly'}>
                <Button
                  colorScheme={'cyan'}
                  variant={isUserInterested ? 'solid' : 'outline'}
                  leftIcon={isUserInterested ? <FaHeart /> : <FiHeart />}
                  onClick={() => {
                    if (isUserInterested) {
                      removeInterested();
                    } else {
                      addInterested();
                    }
                  }}
                >
                  Show Interest
                </Button>
                <Button
                  colorScheme={'cyan'}
                  variant={'outline'}
                  leftIcon={<FiMail />}
                >
                  Send Message
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>
          <Flex
            mt={10}
            boxShadow={'2xl'}
            rounded={'md'}
            borderColor={'gray.200'}
            direction={['column-reverse', 'column-reverse', 'column', 'row']}
          >
            <Flex
              pos={'relative'}
              maxW={['100%', '100%', '50%', '50%']}
              minW={['100%', '100%', '50%', '50%']}
              direction={'column'}
              w={['100%', '100%', '50%', '50%']}
              minH={['md', 'md', 'md', 'md']}
              p={5}
              justifyContent={'space-evenly'}
            >
              <Heading fontFamily={`'Source Code Pro',sans-serif`}>
                About Project
              </Heading>
              <Text>{data.idea}</Text>
              <Heading fontFamily={`'Source Code Pro',sans-serif`}>
                Required Skills
              </Heading>
              <Flex direction={'row'} wrap={'wrap'}>
                {data.required_skills.map(skill => (
                  <Badge bg={badgeBG} fontWeight={'400'} m={1}>
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Flex>
            <Flex direction={'column'} p={10}>
              <Heading fontSize={'xl'} m={2}>
                Project Handler
              </Heading>
              <HStack m={4}>
                <Avatar
                  size={'md'}
                  src={data.image}
                  referrerPolicy="no-referrer"
                />
                <VStack alignItems="flex-start" spacing="1px" ml="2">
                  <Link color={linkColor} fontSize="sm">
                    {data.name}
                  </Link>
                </VStack>
              </HStack>
              <Flex direction={'column'}>
                <Heading fontSize={'xl'}>Interested Users</Heading>

                {data.interested_users ? (
                  data.interested_users.map(user => (
                    <HStack m={4}>
                      <Avatar
                        size={'md'}
                        src={user.photo}
                        referrerPolicy="no-referrer"
                      />
                      <VStack alignItems="flex-start" spacing="1px" ml="2">
                        <Link color={linkColor} fontSize="sm">
                          {user.name}
                        </Link>
                      </VStack>
                    </HStack>
                  ))
                ) : (
                  <Text>No Interested Users for this T_T</Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default SpecificProject;
