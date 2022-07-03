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

export default function ProjectCard(props) {
  let id = props.id;
  let heroImage = props.heroImage || 'https://via.placeholder.com/400x200';
  let logo = props.logo;
  let title = props.title;
  let idea = props.idea;
  let userName = props.userName;
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.700', 'white');
  const [isInterested, setIsInterested] = useState(false);
  let navigate = useNavigate();
  let toast = useToast();
  let token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4OTdjZjk0NTllMjU0ZmYxYzY3YTRlYjZlZmVhNTJmMjFhOWJhMTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU0hBU0hBTksgS1VNQVIgU1JJVkFTVEFWQSAtSUlJVEsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKektFX2wxczNyWTU0ejBFMEROV0F4MFNDbGs5VjdiOGZOVURwb2w9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGFydG5lcnMtaW4tY3JpbWUtMzgzMDkiLCJhdWQiOiJwYXJ0bmVycy1pbi1jcmltZS0zODMwOSIsImF1dGhfdGltZSI6MTY1Njc0NzAyNSwidXNlcl9pZCI6IkFMUEZtNVZDSURUeG5TZURCRFd4N2N2enB4ODMiLCJzdWIiOiJBTFBGbTVWQ0lEVHhuU2VEQkRXeDdjdnpweDgzIiwiaWF0IjoxNjU2NzY3MTE5LCJleHAiOjE2NTY3NzA3MTksImVtYWlsIjoic2hhc2hhbmtrdW1hcjIwYmNzMTVAaWlpdGtvdHRheWFtLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTE1MzgxMTc0MTY1MDU2Nzg4MDQiXSwiZW1haWwiOlsic2hhc2hhbmtrdW1hcjIwYmNzMTVAaWlpdGtvdHRheWFtLmFjLmluIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.bhUkAvSeSXiY_W2x8AKhtxSnsnGUEr2pkSEg5J-DOu-tNgbfO6TX2nPUr3UOZpQVjEPQpDIh8aO_YtNRan3_ud19qF5oBAQk61WPOqOsg8VQhI75P24CevQFYsHy6EktZGgUscQEPyttd9TwEKITWA4PCzlenS7nZFpCNK_-ULk25kUoNfCNjUCo1G_gdDBIhCvq_VfGJnAlk_rLe-uuwL2XYtX3z5stXWFs88aXoGmxh-LDa9W7kAHz1mgaPJ59soOvCmtxhUk_0kwG3bxMCvYP_rlluaAoByusqWmx4UzYZoX3eEoSFIQriSi5nECLPLWaBBRUFunx3LwSRGjWug';
  let addInterested = async () => {
    let url = `http://127.0.0.1:8000/addfavourite`;
    let data = {
      hackathon_id: id,
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
        console.log(json);
        setIsInterested(true);
      } else {
        let json = await response.json();
        console.log(json);
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
        console.log(json);
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
        maxW={'445px'}
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
              <Text noOfLines={1}>
                {idea}
              </Text>
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
              onClick={() => {navigate(`/project/${id}`)}}
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
