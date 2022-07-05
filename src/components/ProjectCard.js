import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Flex,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaLink, FaUserSecret } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useAuth from '../context/AuthContext';

export default function ProjectCard(props) {
  let id = props.id;
  let heroImage = props.heroImage || 'https://via.placeholder.com/400x200';
  let logo = props.logo;
  let title = props.title;
  let shortDescription = props.shortDescription || 'No description';
  shortDescription =
    shortDescription.length > 30
      ? shortDescription.substring(0, 30) + '...'
      : shortDescription;
  let interested = props.interested;

  let userName = props.userName;
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.700', 'white');
  const [isInterested, setIsInterested] = useState(interested);
  let navigate = useNavigate();
  let toast = useToast();
  let { token } = useAuth();
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

        setIsInterested(true);
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

        setIsInterested(false);
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
  return (
    <Center py={6} px={6}>
      <Box
        maxW={'sm'}
        minW={'xs'}
        bg={bg}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box bg={'gray.100'} mt={-6} mx={-6} mb={12} pos={'relative'}>
          <Image src={heroImage} maxH={'200px'} />
        </Box>
        <Flex justify={'flex-start'} mt={-12}>
          <Avatar size={'lg'} borderColor={'gray.200'} mt={-6} src={logo} />
        </Flex>
        <Stack>
          <Heading
            color={color}
            fontSize={'2xl'}
            fontFamily={'body'}
            textAlign={'center'}
          >
            {title}
          </Heading>
          <Flex align={'center'}>
            <Text color={'gray.400'}>
              <Text>{shortDescription}</Text>
              <Text fontWeight={'bold'} color={'gray.100'}>
                By
              </Text>
              {userName}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <IconButton
              variant={isInterested ? 'solid' : 'outline'}
              colorScheme="red"
              aria-label="Interested"
              icon={isInterested ? <FaHeart /> : <FiHeart />}
              onClick={() => {
                if (isInterested) {
                  removeInterested();
                } else {
                  addInterested();
                }
              }}
            />
            <IconButton
              variant={'outline'}
              colorScheme="teal"
              aria-label="visit"
              icon={<FaLink />}
              onClick={() => {
                navigate(`/project/${id}`);
              }}
            />
            <IconButton
              variant={'solid'}
              colorScheme="teal"
              aria-label="find-partners"
              icon={<FaUserSecret />}
              onClick={() => navigate('/find')}
            />
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
}
