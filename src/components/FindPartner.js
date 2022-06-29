import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const FindPartner = () => {
  let color = useColorModeValue('gray.900', 'gray.50');
  const [isActive, setIsActive] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [query, setQuery] = useState('');
  console.log(isActive);
  return (
    <Flex justifyContent={'center'} direction={'column'} align={'center'}>
      <Heading fontFamily={`'Source Code Pro',sans-serif`}>
        Looking for a Partner?
      </Heading>
      <Text color={color} fontSize={'lg'} mt={5}>
        {' '}
        We'll find it for you ✌️
      </Text>
      <Flex
        justifyContent={'center'}
        align={'center'}
        minH={isActive ? '10vh' : '65vh'}
        transition={'all 0.3s ease-in-out'}
      >
        <FormControl minW={'440px'}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch />}
              size={'lg'}
            />
            <Input
              type="text"
              placeholder="What/Who are you looking for?"
              size={'lg'}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              F
              onChange={e => {
                setQuery(e.target.value);
              }}
            />
          </InputGroup>
        </FormControl>
      </Flex>
      <Collapse in={isActive} animateOpacity>
        <Flex
          maxW={'lg'}
          w={'md'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          p={4}
          direction={'column'}
        >
          <Button variant={'ghost'} mt={2}>
            Search Result
          </Button>
          <Button variant={'ghost'} mt={2}>
            Search Result
          </Button>
          <Button variant={'ghost'} mt={2}>
            Search Result
          </Button>
          <Button variant={'ghost'} mt={2}>
            Search Result
          </Button>
          <Button variant={'ghost'} mt={2}>
            Search Result
          </Button>
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default FindPartner;
