import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Link,
  ModalFooter,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from 'react';
import useAuth from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { Center } from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import { FiGithub } from 'react-icons/fi';
function Landing() {
  const { signInPopup, error, loading } = useAuth();
  let toast = useToast();
  if (error) {
    toast({
      title: 'Error',
      description: `${error.message} - ${error.code}`,
      status: 'error',
      isClosable: true,
    });
  }
  return (
    <Flex direction={'column'}>
      <Flex direction="column">
        <Flex
          direction={['column', 'column', 'column', 'row']}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={[0, 0, 0, 5]}
          h={['10vh', '10vh', '10vh', 'auto']}

          // sboxShadow={'xl'}
          // bg={useColorModeValue('gray.100', 'gray.900')}
        >
          <NavLink to="/">
            <Flex direction={'column'}>
              <Heading
                fontFamily={`'Source Code Pro', sans-serif`}
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
            <Button
              onClick={signInPopup}
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              isLoading={loading}
            >
              <Center>
                <Text display={['none', 'none', 'flex', 'flex']}>
                  Sign in with Google
                </Text>
              </Center>
            </Button>

            <ColorModeSwitcher />
          </Flex>
        </Flex>

        <Flex direction={'column'} justifyContent={'center'}>
          <Flex
            minH={'90vh'}
            justifyContent={'center'}
            align={'center'}
            direction={'column'}
          >
            <Heading
              fontFamily={`'Poppins', sans-serif;`}
              // color={useColorModeValue('cyan.600', 'cyan')}
              fontSize={['30px', '40px', '60px', '80px']}
              // textTransform={'uppercase'}
              display={'flex'}
            >
              $ sudo wanna collab?
            </Heading>
            <Text
              mt={5}
              fontSize={['16px', '16px', '18px', '20px']}
              w={'75%'}
              textAlign={'center'}
              fontFamily={`'Ubuntu', sans-serif;`}
              fontWeight={'medium'}
            >
              &gt;_ or wanna create something of your own and need some cool
              devs for that?
            </Text>
            <ButtonGroup spacing={10} mt={5}>
              <Button
                variant={'solid'}
                size={'lg'}
                colorScheme={'cyan'}
                borderRadius={'full'}
                onClick={signInPopup}
              >
                {' '}
                Get Started
              </Button>
              <Button
                variant={'ghost'}
                size={'lg'}
                colorScheme={'cyan'}
                borderRadius={'full'}
                onClick={() => {
                  let scrollAmt = Math.round(window.innerHeight * 1.05);
                  console.log(scrollAmt);
                  window.scrollTo({
                    top: scrollAmt,
                  });
                }}
              >
                Learn More
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        bg={useColorModeValue('cyan.50', 'blackAlpha.500')}
        id={'about'}
      >
        <Flex mx={[0, 0, 5, 10]} minW={'350px'} flexBasis={'50%'} flexGrow={1}>
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1657374238/Code_typing-pana_oj8lmh.png'
            }
          />
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            w={'75%'}
          >
            {' '}
            Find and interact with developers
          </Heading>
          <Text w={'75%'} my={5}>
            They say the best method to learn is to by do, that's even better
            when you have a college mate with you. Find your college-dev-mates,
            collaborate and build your own projects.
          </Text>
        </Flex>
      </Flex>{' '}
      <Flex
        direction={['column', 'column', 'column', 'row-reverse']}
        bg={useColorModeValue('whiteAlpha', 'blackAlpha.100')}
      >
        <Flex
          flex={1}
          mx={[0, 0, 5, 10]}
          minW={'350px'}
          flexBasis={'50%'}
          flexGrow={1}
        >
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1657374238/Collab-cuate_zkel1t.png'
            }
          />
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            w={'75%'}
          >
            {' '}
            Get latest updates about hackathons
          </Heading>
          <Text w={'75%'} my={5}>
            Your search for hackathons is over. Find the latest updates about
            hackathons from different websites.
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={['column', 'column', 'column', 'row']}
        bg={useColorModeValue('cyan.50', 'blackAlpha.500')}
      >
        <Flex
          flex={1}
          mx={[0, 0, 5, 10]}
          minW={'350px'}
          // maxH={'500px'}
          flexBasis={'50%'}
          flex={1}
        >
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'https://res.cloudinary.com/dpjf6btln/image/upload/v1657469132/Collaboration-cuate_syacsj.png'
            }
          />
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            w={'75%'}
          >
            {' '}
            Share your ideas
          </Heading>
          <Text w={'75%'} my={5}>
            Ideas are contagious, the best ones spread. Share ideas with your
            friends and make them come to life.
          </Text>
        </Flex>
      </Flex>{' '}
      <Flex
        direction={'column'}
        bg={useColorModeValue('whiteAlpha', 'blackAlpha.100')}
      >
        <Flex direction={'column'} justifyContent={'center'} align={'center'}>
          <Heading
            fontSize={['25px', '30px', '45px', '45px']}
            fontFamily={`'Poppins', sans-serif;`}
            my={20}
          >
            {' '}
            And Build Together
          </Heading>
        </Flex>
        <Flex
          minW={'350px'}
          // w={'75%'}
          justifyContent={'center'}
          align={'center'}
        >
          <Image
            alt={'Landing Image'}
            objectFit={'cover'}
            src={
              'http://res.cloudinary.com/dpjf6btln/image/upload/v1657383944/JavaScript_frameworks-cuate_w1rjh6.png'
            }
            w={'75%'}
          />
        </Flex>
        <Flex
          justifyContent={'center'}
          align={'center'}
          direction={'column'}
          my={10}
        >
          <Heading
            fontSize={['20px', '25px', '25px', '30px']}
            fontFamily={`'Poppins', sans-serif;`}
            mb={10}
          >
            {' '}
            Ready for some mischeif?
          </Heading>
          <Button
            variant={'solid'}
            bg={'cyan.500'}
            variantColor={'white'}
            color={'white'}
            borderColor={'whiteAlpha.300'}
            size={'lg'}
            borderRadius={'full'}
            _hover={{
              bg: 'cyan.600',
            }}
            onClick={signInPopup}
            mb={10}
          >
            {' '}
            Join Us Now
          </Button>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Landing;
