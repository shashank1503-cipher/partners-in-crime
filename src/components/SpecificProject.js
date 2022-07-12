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
import { FiEdit, FiHeart, FiMail, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useAuth from '../context/AuthContext';
import Logo from './Logo';

const SpecificProject = ({ id }) => {
  const [data, setData] = useState({});
  const [isUserInterested, setIsUserInterested] = useState(false);
  const [isUserOwner, setIsUserOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  let { token } = useAuth();
  let toast = useToast();
  let navigate = useNavigate();
  let fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://partners-in-crime-backend.herokuapp.com/project/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        let json = await res.json();
        setData(json.data);
        setIsUserInterested(json.data.is_user_interested);
        console.log(json.data.is_owner);
        setIsUserOwner(json.data.is_owner);
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
    let url = `https://partners-in-crime-backend.herokuapp.com/addfavourite`;
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
    let url = `https://partners-in-crime-backend.herokuapp.com/deleteFavourite/${id}?is_project=${true}`;
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
  let deleteProject = async () => {
    setIsDeleteLoading(true);
    try {
      let response = await fetch(
        `https://partners-in-crime-backend.herokuapp.com/project/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        let json = await response.json();
        toast({
          title: 'Success',
          description: `${json.detail} - ${response.status}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
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
    } finally {
      setIsDeleteLoading(false);
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
            <Box pos={'relative'} flex={1}>
              <Image
                src={
                  data.hero_image
                    ? data.hero_image
                    : 'https://res.cloudinary.com/dpjf6btln/image/upload/v1657569778/Placeholder_j6vr12.png'
                }
                maxH={'lg'}
                roundedTopLeft={'md'}
                roundedBottomLeft={'md'}
                mx={'auto'}
              />
            </Box>
            <Flex
              direction={'column'}
              flex={1}
              minH={['sm', 'sm', 'sm', 'sm']}
              p={5}
              justifyContent={'space-evenly'}
            >
              <Heading
                textAlign={'center'}
                fontFamily={`'Source Code Pro',sans-serif`}
                color={linkColor}
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
                  onClick={() => {
                    navigate(`/messages?chat=${data.g_id}`);
                  }}
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
            direction={['column', 'column', 'column', 'row']}
          >
            <Flex
              pos={'relative'}
              flex={1}
              direction={'column'}
              p={5}
              textAlign={['center', 'center', 'center', 'left']}
              justifyContent={'flex-start'}
            >
              {isUserOwner && (
                <Flex
                  justifyContent={['center', 'center', 'center', 'flex-end']}
                  mt={10}
                >
                  <ButtonGroup>
                    <Button
                      colorScheme={'cyan'}
                      variant={'outline'}
                      leftIcon={<FiEdit />}
                      onClick={() => {
                        navigate(`/editproject/${id}`, { state: { data } });
                      }}
                    >
                      Edit Project
                    </Button>
                    <Button
                      colorScheme={'cyan'}
                      variant={'outline'}
                      leftIcon={<FiTrash />}
                      onClick={deleteProject}
                    >
                      Delete Project
                    </Button>
                  </ButtonGroup>
                </Flex>
              )}
              <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                About Project
              </Heading>
              <Text ml={[0, 0, 0, 10]}>{data.idea}</Text>
              <Heading fontFamily={`'Source Code Pro',sans-serif`} m={10}>
                Required Skills
              </Heading>
              <Flex
                direction={'row'}
                wrap={'wrap'}
                justifyContent={['center', 'center', 'center', 'flex-start']}
                ml={[0, 0, 0, 10]}
              >
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
                        <Link
                          color={linkColor}
                          fontSize="sm"
                          onClick={() => {
                            navigate(`/profile/${user['_id']}`);
                          }}
                        >
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
