import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Logo from './Logo';
import ProfileCard from './ProfileCard';
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Display() {
  let query = useQuery();
  let q = query.get('id');
  // console.log(q);
  const [bandas, setBandas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const getBandas = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://partners-in-crime-backend-production.up.railway.app/search?q=${q}`
      );
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setBandas(data.data);
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
  }, []);

  return (
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
  );
}
export default Display;
