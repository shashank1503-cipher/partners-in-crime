import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import HackathonCard from './HackathonCard';
import Logo from './Logo';

const MLHHackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);
  const [more, setMore] = useState(false);
  const [query, setQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  let fetchData = async () => {
    console.log(perPage);
    setLoading(true);
    try {
      const res = await fetch(
        `https://hackathon-api-v2.herokuapp.com/mlh?q=${query}&per_page=${perPage}&`
      );
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setTotalRecords(data.meta.total);
        setHackathons(data.data);
        setError(null);
      } else {
        const data = await res.json();
        let errorMessage = new Error(data.detail);
        setError(errorMessage);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [perPage]);
  return (
    <>
      <Flex justifyContent={'flex-end'}>
        <IconButton icon={<FaFilter />} onClick={onOpen} />
      </Flex>
      <Flex
        wrap={'wrap'}
        justifyContent={'space-evenly'}
        minH={'75vh'}
        align={'center'}
      >
        {loading ? (
          <Text
          fontSize="2xl"
          fontFamily={`'Source Code Pro', sans-serif`}
          color={'cyan'}
          fontWeight="bold"
        >
          <Logo fontSize = {"4xl"}  />
        </Text>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error! </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          hackathons.map(hackathon => (
            <HackathonCard
              key={hackathon.id}
              name={hackathon.name}
              logo={hackathon.image}
              heroImage={hackathon.heroImage}
              website={hackathon.website}
              url={hackathon.url}
              location={hackathon.location}
              start={hackathon.start}
              end={hackathon.end}
              mode={hackathon.mode}
            />
          ))
        )}
      </Flex>
      <Flex justifyContent={'flex-end'} m={5}>
        <Button
          colorScheme={'teal'}
          display={loading ? 'none' : 'flex'}
          onClick={() => {
            setPerPage(more ? 3 : totalRecords);
            setMore(!more);
          }}
        >
          Show {more ? 'less' : 'more'}
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={<FaSearch />}
                />
                <Input
                  placeholder="Search"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={fetchData} mr={5} colorScheme={'teal'}>
              Apply
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MLHHackathon;
