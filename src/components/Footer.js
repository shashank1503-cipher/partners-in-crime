import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';

import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const abtus = () => {
    navigate('/aboutus');
  };
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={1}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo />
        <Box>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={2}
            justify={{ base: 'center' }}
            align={{ base: 'center', md: 'center' }}
          >
            <Heading
              fontFamily={`'Poppins', sans-serif`}
              // color={useColorModeValue('cyan.600', 'cyan')}
              fontSize={['14px', '14px', '18px', '20px']}
            >
              {' '}
              Made with 🫀 by
            </Heading>{' '}
            <Button
              onClick={abtus}
              px={4}
              fontSize={'sm'}
              rounded={'full'}
              bg={'cyan.300'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
            >
              <Heading
                fontFamily={`'Poppins', sans-serif`}
                color={useColorModeValue('black.600', 'black')}
                fontSize={['14px', '14px', '18px', '20px']}
              >
                {' '}
                The Team
              </Heading>{' '}
            </Button>
            <Heading
              fontFamily={`'Source Code Pro', sans-serif`}
              color={useColorModeValue('cyan.600', 'cyan')}
              fontSize={['14px', '14px', '18px', '20px']}
            >
              {' '}
              &lt;partnersInCrime&gt;
            </Heading>{' '}
          </Container>
        </Box>
        <Logo />
      </Container>
    </Box>
  );
}
