import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  useDisclosure,
  ModalFooter,
  Checkbox,
  FormLabel,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaFilter } from 'react-icons/fa';
import { useLocation } from 'react-router';
import useAuth from '../context/AuthContext';
import Logo from './Logo';
import ProfileCard from './ProfileCard';
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Display() {
  let query = useQuery();
  let q = query.get('id');
  let color = useColorModeValue('gray.900', 'gray.50');
  // console.log(q);
  const [bandas, setBandas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalRecords, setTotalRecords] = useState(0)
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [batch, setBatch] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useAuth();
  const getBandas = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://anplt2s03b.execute-api.ap-south-1.amazonaws.com/dev/search?q=${q}&page=${page}&per_page=${perPage}&batch=${batch}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setBandas(data.data);
        setTotalRecords(data.meta.count)
        setError(null)
      } else {
        const data = await res.json();
        setError(data.detail);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getBandas();
  }, [page]);

  return (
    <>
      <Flex justifyContent={'flex-end'} m={5} mr={10}>
        <IconButton icon={<FaFilter />} onClick={onOpen} />
      </Flex>
      <Flex justifyContent={'center'} direction={'column'} align={'center'}>
        <Heading fontFamily={`'Source Code Pro',sans-serif`}>
          Found these guys for you! 😎
        </Heading>
        <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
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
          ) : bandas.length === 0 ? (
            <Flex
              direction={'column'}
              justifyContent={'space-evenly'}
              minH={'xs'}
              textAlign={'center'}
            >
              <Heading>Uh oh! Nothing to see here T_T</Heading>
              <Text fontSize="lg" fontFamily={`'Source Code Pro', sans-serif`}>
                No Users Found for your search query. Try Searching for a new skill
                or person.
              </Text>
            </Flex>
          ) : (
            bandas.map(banda => (
              <ProfileCard
                key={banda.id}
                id={banda['_id']}
                name={banda.name}
                photo={banda.photo}
                skills={banda.skills}
                email={banda.email}
                bio={banda.bio}
                gId={banda.g_id}
              />
            ))
          )}
        </Flex>
        {loading || error || bandas.length == 0 ? null :

          <Flex m={5} verticalAlign={'center'}>
            <ButtonGroup mr={'10'}>
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
            <Text mt={2}>
              Page {page} of {Math.floor(totalRecords / perPage) + 1}
            </Text>
          </Flex>
        }
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Batch</FormLabel>
              <RadioGroup defaultValue='1' value={batch} onChange={setBatch}>
                <Stack spacing={5} direction='row'>
                  <Radio colorScheme='red' value='2020'>
                    2020
                  </Radio>
                  <Radio colorScheme='green' value='2019'>
                    2019
                  </Radio>
                  <Radio colorScheme='blue' value='2021'>
                    2021
                  </Radio>
                  <Radio colorScheme='teal' value='2022'>
                    2022
                  </Radio>
                  <Radio colorScheme='purple' value='1'>
                    All
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={getBandas} mr={5} colorScheme={'teal'}>
              Apply
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Display;
