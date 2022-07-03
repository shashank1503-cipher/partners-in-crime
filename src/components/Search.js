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
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router';
import Logo from './Logo';
import ProfileCard from './ProfileCard';
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Display() {
  let query = useQuery();
  let q=query.get("id")
  console.log(q)
  const [banda, setBanda] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const getBanda = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/search?q=${q}`
      );
      const data = await res.json();
      console.log(data)
      setBanda(data.data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getBanda();
  }, []);
  
   return (
   <Flex wrap={'wrap'}>
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
        ) : (
          
          banda.map(banda => (
            <ProfileCard
            key={banda.id}
            name={banda.name}
            photo={banda.photo}
            />
           
          ))
        )}
   </Flex>
    
  );
}
export default Display;