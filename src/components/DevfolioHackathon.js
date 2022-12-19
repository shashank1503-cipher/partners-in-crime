import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter, FaSearch } from 'react-icons/fa';
import HackathonCard from './HackathonCard';
import Logo from './Logo';

const DevfolioHackathon = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);
  const [more, setMore] = useState(false);
  const [query, setQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(0);
  let fetchData = async () => {
    
    setLoading(true);
    try {
      const res = await fetch(
        `https://4hnk5enbn4qgine6mykbfwk66y0lkljd.lambda-url.ap-south-1.on.aws/devfolio?q=${query}&page=${page}&per_page=${perPage}&`
      );
      
      if (res.status === 200) {
        const data = await res.json();
        
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
  }, [perPage,page]);
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
          <Logo fontSize={'4xl'} />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error! </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          hackathons.map(hackathon => (
            <HackathonCard
              key={hackathon['_id']}
              id = {hackathon['_id']}
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
        <ButtonGroup display={more && !loading ? 'flex' : 'none'} mr={'10'} >
          <IconButton
            icon={<FaArrowLeft />}
            onClick={() => setPage(page - 1)}
            disabled={page === 0 ? true : false}
          >
            Previous
          </IconButton>
          <IconButton
            icon={<FaArrowRight />}
            disabled={
              Math.floor(totalRecords / perPage) === page ? true : false
            }
            onClick={() => setPage(page + 1)}
          >
            Next
          </IconButton>
        </ButtonGroup>
        <Button
          colorScheme={'teal'}
          display={loading ? 'none' : 'flex'}
          onClick={() => {
            setPerPage(more ? 3 : 10);
            setPage(0);
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

export default DevfolioHackathon;
