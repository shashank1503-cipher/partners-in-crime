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
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaLink, FaUserSecret } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router';

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
  
  let website = props.website;
  let heroImage = props.heroImage || heroImageMap[website];
  let logo = props.logo || logoImageMap[website];
  let name = props.name;
  let startDate = props.start;
  let endDate = props.end;
  let Location = props.location;
  let mode = props.mode;
  let link = props.url;
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.700', 'white');
  const [isInterested, setIsInterested] = useState(false);
  let navigate = useNavigate()

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
              <Text fontWeight={'bold'} color={'gray.100'}>
                Date
              </Text>
              {startDate} - {endDate}
              <Text fontWeight={'bold'} color={'gray.100'}>
                Location
              </Text>
              {Location}
              <Text fontWeight={'bold'} color={'gray.100'}>
                Mode
              </Text>
              {mode}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <IconButton
              variant={isInterested ? 'solid' : 'outline'}
              colorScheme="red"
              aria-label="Interested"
              icon={isInterested ? <FaHeart /> : <FiHeart />}
              onClick={() => setIsInterested(!isInterested)}
            />
            <IconButton
              variant={'outline'}
              colorScheme="teal"
              aria-label="visit"
              icon={<FaLink />}
              onClick={() => window.open(link, '_blank')}
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
