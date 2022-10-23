import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter, FaSearch } from 'react-icons/fa';
import useAuth from '../context/AuthContext';
import HackathonCard from './HackathonCard';
import Logo from './Logo';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);
  const [more, setMore] = useState(false);
  const [query, setQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  let { token } = useAuth();
  let fetchData = async () => {

    setLoading(true);
    try {
      const res = await fetch(
        `https://partners-in-crime-backup.herokuapp.com/fetchprojects?q=${query}&page=${page}&per_page=${perPage}&`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();

        setTotalRecords(data.meta.total_records);
        setProjects(data.data);
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
  }, [perPage, page]);
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
            <Logo fontSize={'4xl'} />
          </Text>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error! </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : projects.length > 0 ? (
          projects.map(project => (
            <ProjectCard
              key={project['_id']}
              id={project['_id']}
              title={project['title']}
              heroImage={project['hero_image']}
              logo={project['image']}
              idea={project['idea']}
              shortDescription={project['description']}
              userName={project['name']}
              interested={project['interested']}
            />
          ))
        ) : (
          <Flex
            direction={'column'}
            justifyContent={'space-evenly'}
            minH={'xs'}
            textAlign={'center'}
          >
            <Heading>Uh oh! Nothing to see here T_T</Heading>
            <Text fontSize="lg" fontFamily={`'Source Code Pro', sans-serif`}>
              No projects found. Take a chill pill and come back later.
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex justifyContent={'flex-end'} m={5}>
        <ButtonGroup display={more ? 'flex' : 'none'} mr={'10'}>
          <IconButton
            icon={<FaArrowLeft />}
            onClick={() => setPage(page - 1)}
            disabled={page === 1 ? true : false}
          >
            Previous
          </IconButton>
          <IconButton
            icon={<FaArrowRight />}
            disabled={
              Math.floor(totalRecords / perPage) === page - 1 ? true : false
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
            setPage(1);
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

export default Projects;
