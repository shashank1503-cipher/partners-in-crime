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
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaLink, FaUserSecret } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import useAuth from '../context/AuthContext';

export default function HackathonCard(props) {
  const heroImageMap = {
    'mlh.io':
      'https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.svg',
    DEVPOST:
      'https://res.cloudinary.com/hackbot/image/upload/v1610604172/Hackbot%20Web/Devpost_hpiydu.jpg',
    DEVFOLIO:
      'https://www.hackoff.tech/v2.0/html/event_organizer/images/brands/devfolio.png',
  };
  const logoImageMap = {
    'mlh.io':
      'https://res.cloudinary.com/hackbot/image/upload/v1610603074/Hackbot%20Web/mlh-facebook-ae6144c0a3605f15992ee2970616db8d_excuuh.jpg',
    DEVPOST:
      'https://res.cloudinary.com/hackbot/image/upload/v1610604172/Hackbot%20Web/Devpost_hpiydu.jpg',
    DEVFOLIO:
      'https://res.cloudinary.com/hackbot/image/upload/v1610594222/Hackbot%20Web/38809367_j6zmw0.png',
  };
  let id = props.id;
  let website = props.website;
  let heroImage = props.heroImage || heroImageMap[website];
  let logo = props.logo || logoImageMap[website];
  let name = props.name;
  let startDate = props.start;
  let endDate = props.end;
  let Location = props.location;
  let mode = props.mode;
  let link = props.url;
  let interested = props.interested;
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.700', 'white');
  const [isInterested, setIsInterested] = useState(interested);
  let navigate = useNavigate();
  let toast = useToast();
  let { token } = useAuth();
  let addInterested = async () => {
    let url = `https://lxuwymtrux3fuvgvqxvackkcvq0alfqf.lambda-url.ap-south-1.on.aws/addfavourite`;
    let data = {
      hackathon_id: id,
      name: name,
      image: logo,
      heroImage: heroImage,
      website: website,
      url: link,
      location: Location,
      start: startDate,
      end: endDate,
      mode: mode,
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
    let url = `https://lxuwymtrux3fuvgvqxvackkcvq0alfqf.lambda-url.ap-south-1.on.aws/deleteFavourite/${id}?is_project=${false}`;
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
          <Image
            src={heroImage}
            maxH={'200px'}
            mx={'auto'}
            objectFit={'fill'}
          />
        </Box>
        <Flex justify={'flex-start'} mt={-12}>
          <Avatar size={'lg'} borderColor={'gray.200'} mt={-6} src={logo} />
        </Flex>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {website}
          </Text>
          <Heading
            color={color}
            fontSize={'2xl'}
            fontFamily={'body'}
            textAlign={'center'}
          >
            {name}
          </Heading>
          <Flex align={'center'}>
            <Text color={'gray.400'}>
              <Text
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.100')}
              >
                Date
              </Text>
              {startDate} - {endDate}
              <Text
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.100')}
              >
                Location
              </Text>
              {Location}
              <Text
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.100')}
              >
                Mode
              </Text>
              {mode}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Tooltip bgColor={useColorModeValue('gray.100','gray.700')} color={useColorModeValue('blackAlpha.800','whiteAlpha.800')} p={2} boxShadow={'2xl'} fontSize={'13'}
              hasArrow rounded={'md'} label="Add to Favourites" >
              <IconButton
                variant={isInterested ? 'solid' : 'outline'}
                colorScheme="red"
                aria-label="Interested"
                disabled={props.interestButtonDisabled}
                icon={isInterested ? <FaHeart /> : <FiHeart />}
                onClick={() => {
                  if (isInterested) {
                    removeInterested();
                  } else {
                    addInterested();
                  }
                }}
              />
            </Tooltip>
            <Tooltip bgColor={useColorModeValue('gray.100','gray.700')} color={useColorModeValue('blackAlpha.800','whiteAlpha.800')} p={2} boxShadow={'2xl'} fontSize={'13'}
              hasArrow rounded={'md'} label="Visit Hackathon Page" >
              <IconButton
                variant={'outline'}
                colorScheme="teal"
                aria-label="visit"
                icon={<FaLink />}
                onClick={() => window.open(link, '_blank')}
              />
            </Tooltip>
            <Tooltip bgColor={useColorModeValue('gray.100','gray.700')} color={useColorModeValue('blackAlpha.800','whiteAlpha.800')} p={2} boxShadow={'2xl'} fontSize={'13'}
              hasArrow rounded={'md'} label="Find Partners">
              <IconButton
                variant={'solid'}
                colorScheme="teal"
                aria-label="find-partners"
                icon={<FaUserSecret />}
                onClick={() => navigate('/find')}
              />
            </Tooltip>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
}
