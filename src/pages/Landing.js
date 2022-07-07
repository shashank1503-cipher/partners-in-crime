import {
  Box,
  Button,
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
    <Flex direction="column">
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        p={5}
        boxShadow={'xl'}
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Flex direction={'column'}>
          <Heading
            fontFamily={`'Source Code Pro', sans-serif`}
            color={useColorModeValue('cyan.600', 'cyan')}
            fontSize={['20px', '24px', '28px', '30px']}
          >
            {' '}
            &lt;partnersInCrime&gt;
          </Heading>{' '}
        </Flex>
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
              <Text>Sign in with Google</Text>
            </Center>
          </Button>

          <ColorModeSwitcher />
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        justifyContent={'center'}
        textAlign={'center'}
        minH={'75vh'}
      >
        <Stack minH={'100vh'} direction={{ base: 'column-reverse', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={10} w={'full'} maxW={'lg'}>
              <Heading
                fontFamily={`'Source Code Pro', sans-serif`}
                color={useColorModeValue('cyan.600', 'cyan')}
                fontSize={['4xl', '4xl', '5xl', '5xl']}
                textAlign={'center'}
              >
                {' '}
                &lt;partnersInCrime&gt;
              </Heading>{' '}
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                Let's Do Something Fishy
              </Text>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justifyContent={'center'}
              >
                <Button
                  onClick={signInPopup}
                  size={'lg'}
                  rounded={'full'}
                  colorScheme={'cyan'}
                >
                  Get Started
                </Button>
              </Stack>
            </Stack>
          </Flex>

          <Flex flex={1} p={10}>
            <Image
              alt={'Landing Image'}
              objectFit={'cover'}
              src={
                'https://res.cloudinary.com/dpjf6btln/image/upload/v1656518823/Developer_activity-bro_btrgar.png'
              }
            />
          </Flex>
        </Stack>
        <Footer />
      </Flex>
    </Flex>
  );
}

export default Landing;
