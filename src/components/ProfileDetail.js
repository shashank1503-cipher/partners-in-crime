import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Logo from './Logo';

const ProfileDetail = ({ id }) => {
  console.log(id);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let { token } = useAuth();
  let fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://partners-in-crime-backend.herokuapp.com/profile/${id}`,
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
        // console.log(data);
        // console.log(json.data.is_user_interested)
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
  let pronounMap = { 0: 'He/Him', 1: 'She/Her', 2: 'They/Them', 3: '' };
  //   let data = {
  //     id: '62be89a9df9fa5b672b8961f',
  //     name: 'SHASHANK KUMAR SRIVASTAVA -IIITK',
  //     email: 'shashankkumar20bcs15@iiitkottayam.ac.in',
  //     photo:
  //       'http://res.cloudinary.com/dpjf6btln/image/upload/v1657122298/Partners-In-Crime/accvvc0z8g2dom5l5fdg.png',
  //     g_id: 'ALPFm5VCIDTxnSeDBDWx7cvzpx83',
  //     skills: [
  //       'C++',
  //       'Objective-C',
  //       'React',
  //       'Node',
  //       'Express',
  //       'Python',
  //       'Django',
  //     ],
  //     batch: '2020',
  //     socials: ['https://github.com/shashank1503-cipher', null],
  //     lastName: '',
  //     mobile: '',
  //     pronoun: 0,
  //     username: '',
  //     bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan euismod nunc eu dignissim. Duis bibendum laoreet ipsum, vel egestas massa feugiat vel. Sed tincidunt est eu lacus maximus, nec faucibus lacus vehicula. In eget sapien efficitur, aliquam ipsum nec, pulvinar tellus. In mauris est, porta quis lobortis in, aliquet vitae diam. Aliquam erat volutpat. Donec fermentum nunc metus, a condimentum magna finibus sit amet. Aliquam luctus congue dapibus. Vivamus facilisis rhoncus purus. Vestibulum sollicitudin faucibus risus, ac placerat lectus finibus eu.adsasd.',
  //   };
  let headingColor = useColorModeValue('cyan.600', 'cyan');
  let lightColor = useColorModeValue('gray.500', 'gray.400');
  let badgeBG = useColorModeValue('gray.50', 'gray.600');
  let navigate = useNavigate();

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
            justifyContent={'space-evenly'}
            direction={['column', 'column', 'column', 'row']}
            align={'center'}
            py={['0', '10']}
            boxShadow={'2xl'}
            rounded={'md'}
            borderColor={'gray.200'}
          >
            <Box
              position={'relative'}
              borderRadius={'full'}
              borderColor={'teal'}
              borderWidth={3}
            >
              <Image
                borderRadius="full"
                boxSize={['200px', '170px']}
                src={data.photo}
                alt="Profile Pic"
              />
            </Box>
            <Flex direction={'column'}>
              <Heading
                fontFamily={`'Source Code Pro',sans-serif`}
                color={headingColor}
                size={['lg', 'xl']}
                textAlign={'center'}
                my={['7', '0']}
              >
                {data.name}
              </Heading>

              <Text px={2} textAlign={['center', 'center', 'center', 'left']}>
                {pronounMap[data.pronoun]}
              </Text>
              <Text
                px={2}
                textAlign={['center', 'center', 'center', 'left']}
                color={lightColor}
              >
                {data.email}
              </Text>
              <Flex
                justifyContent={['center', 'center', 'flex-end', 'flex-end']}
                m={5}
              >
                <Button
                  colorScheme={'cyan'}
                  variant={'solid'}
                  leftIcon={<FiMail />}
                  onClick={() => {
                    navigate(`/messages?chat=${data.g_id}`);
                  }}
                >
                  Send Message
                </Button>
              </Flex>
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
              flex={1}
              direction={'column'}
              p={5}
              justifyContent={'space-evenly'}
              textAlign={['center', 'center', 'center', 'left']}
            >
              {data.bio ? (
                <>
                  {' '}
                  <Heading fontFamily={`'Source Code Pro',sans-serif`} m={4}>
                    About Me
                  </Heading>
                  <Text>{data.bio}</Text>
                </>
              ) : null}
              {data.skills ? (
                <>
                  <Heading fontFamily={`'Source Code Pro',sans-serif`} m={4}>
                    Skills I possess
                  </Heading>
                  <Flex
                    direction={'row'}
                    wrap={'wrap'}
                    justifyContent={[
                      'center',
                      'center',
                      'center',
                      'flex-start',
                    ]}
                  >
                    {data.skills.map(skill => (
                      <Box bg={badgeBG} size={'lg'} m={1} p={3} rounded={'md'}>
                        {skill}
                      </Box>
                    ))}
                  </Flex>
                </>
              ) : (
                <></>
              )}
            </Flex>
            <Flex direction={'column'} p={10}>
              <Heading fontSize={'xl'} m={2}>
                My Social Handles
              </Heading>
              <HStack m={4}>
                {data.socials[0] ? (
                  <IconButton
                    variant="ghost"
                    variantColor="cyan"
                    icon={<FaGithub />}
                    aria-label="Github"
                    onClick={() => window.open(data.socials[0], '_blank')}
                  />
                ) : (
                  <>
                    <IconButton
                      variant="ghost"
                      variantColor="cyan"
                      icon={<FaGithub />}
                      aria-label="Github"
                      disabled={true}
                    />
                    <Text>Github Not Provided</Text>
                  </>
                )}
                {data.socials[1] ? (
                  <IconButton
                    variant="ghost"
                    variantColor="cyan"
                    icon={<FaLinkedin />}
                    aria-label="LinkedIN"
                    onClick={() => window.open(data.socials[1], '_blank')}
                  />
                ) : (
                  <>
                    <IconButton
                      variant="ghost"
                      variantColor="cyan"
                      icon={<FaLinkedin />}
                      aria-label="LinkedIN"
                      disabled={true}
                    />
                    <Text>LinkedIn Not Provided</Text>
                  </>
                )}
              </HStack>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ProfileDetail;
