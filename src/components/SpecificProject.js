import {
  Avatar,
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
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiHeart, FiMail } from 'react-icons/fi';

const SpecificProject = ({ id }) => {
  let data = {
    id: '1',
    user_id: '1',
    name: 'SHASHANK KUMAR SRIVASTAVA -IIITK',
    email: 'shashankkumar20bcs15@iiitkottayam.ac.in',
    image:
      'http://res.cloudinary.com/dpjf6btln/image/upload/v1657122298/Partners-In-Crime/accvvc0z8g2dom5l5fdg.png',
    hero_image:
      'http://res.cloudinary.com/dpjf6btln/image/upload/v1657135966/Partners-In-Crime/nuiyrskbyosvuj8zalxx.png',
    title: 'Partners In Crime',
    description:
      'To bring developers together from the same college to collaborate',
    idea: "It's a community-based web app where developers from the same college or institution could come together and find other developers to participate in hackathons or create some stuff together. It's currently under development. We need to add various features.",
    required_skills: [
      'HTML',
      'CSS',
      'Frontend',
      'React',
      'Javascript',
      'Backend',
      'Python',
    ],
    is_user_interested: false,
    interested_users: [
      {
        id: '1',
        name: 'AKARSH PANDEY -IIITK',
        image:
          'http://res.cloudinary.com/dpjf6btln/image/upload/v1657121635/Partners-In-Crime/anncr3ylk5fott1akurm.jpg',
      },
      {
        id: '1',
        name: 'Ishaan',
        image:
          'http://res.cloudinary.com/dpjf6btln/image/upload/v1657106625/Partners-In-Crime/ig9agt6pjzndos2iya9f.jpg',
      },
    ],
  };
  const [isUserInterested, setIsUserInterested] = useState(
    data.is_user_interested
  );
  return (
    <Flex direction={'column'}>
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
            color={useColorModeValue('cyan.600', 'cyan')}
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
                setIsUserInterested(!isUserInterested);
              }}
            >
              Show Interest
            </Button>
            <Button
              colorScheme={'cyan'}
              variant={'outline'}
              leftIcon={<FiMail />}
              //   onClick={() => {
              //     setIsUserInterested(!isUserInterested);
              //   }}
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
          <Heading>About Project</Heading>
          <Text>{data.idea}</Text>
          <Heading>Required Skills</Heading>
          <Text>{data.required_skills.join(', ')}</Text>
        </Flex>
        <Flex direction={'column'} p={10}>
          <Heading fontSize={'xl'} m={2}>
            Project Handler
          </Heading>
          <HStack m={4}>
            <Avatar size={'md'} src={data.image} referrerPolicy="no-referrer" />
            <VStack alignItems="flex-start" spacing="1px" ml="2">
              <Link fontSize="sm">{data.name}</Link>
            </VStack>
          </HStack>
          <Flex direction={'column'}>
            <Heading fontSize={'xl'}>Interested Users</Heading>

            {data.interested_users.map(user => (
              <HStack m={4}>
                <Avatar
                  size={'md'}
                  src={user.image}
                  referrerPolicy="no-referrer"
                />
                <VStack alignItems="flex-start" spacing="1px" ml="2">
                  <Link fontSize="sm">{user.name}</Link>
                </VStack>
              </HStack>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SpecificProject;
