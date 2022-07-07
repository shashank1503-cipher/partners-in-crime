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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter, FaSearch } from 'react-icons/fa';
import useAuth from '../context/AuthContext';
import HackathonCard from './HackathonCard';
import Logo from './Logo';

const FavouriteHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(3);
  const [totalRecords, setTotalRecords] = useState(0);
  const [more, setMore] = useState(false);
  const [query, setQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  let { token } = useAuth();
  console.log(Math.floor(totalRecords / perPage), page);
  let fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://partners-in-crime-backend.herokuapp.com/fetchuserhackathons?q=${query}&page=${page}&per_page=${perPage}&`,
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
        console.log(totalRecords);
        console.log(data);
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
  }, [perPage, page]);
  return (
    <>
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
        ) : hackathons.length > 0 ? (
          hackathons.map(hackathon => (
            <HackathonCard
              key={hackathon.hackathon_details['_id']}
              id={hackathon.hackathon_details['_id']}
              name={hackathon.hackathon_details.name}
              logo={hackathon.hackathon_details.image}
              heroImage={hackathon.hackathon_details.heroImage}
              website={hackathon.hackathon_details.website}
              url={hackathon.hackathon_details.url}
              location={hackathon.hackathon_details.location}
              start={hackathon.hackathon_details.start}
              end={hackathon.hackathon_details.end}
              mode={hackathon.hackathon_details.mode}
              interested={true}
              interestButtonDisabled={true}
            />
          ))
        ) : (
          <Alert status="info">
            <AlertIcon />
            <AlertTitle>Nthing here T_T</AlertTitle>
            <AlertDescription>
              <Text fontSize="lg" fontFamily={`'Source Code Pro', sans-serif`}>
                Hit the heart button to see them here
              </Text>
            </AlertDescription>
          </Alert>
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
    </>
  );
};

export default FavouriteHackathons;
