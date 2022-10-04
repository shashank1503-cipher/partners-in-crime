import React, { useState } from 'react';
import { Stack, Text, Button, Flex } from '@chakra-ui/react';
import { FaHeart, FaUserSecret } from 'react-icons/fa';
import useAuth from '../context/AuthContext';
import { FiMail } from 'react-icons/fi';

export default function NotificationCard(props) {
  let { title, description, date, time, type, _id } = props.data;

  const [loading, setLoading] = useState(false);
  let { token } = useAuth();
  let markAsRead = async () => {
    setLoading(true);
    let response = await fetch(`https://partners-in-crime-backend.herokuapp.com/notifications/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      props.markAsRead(_id);
    }
    setLoading(false);
  };

  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" w={'full'}>
      <Stack direction="row" alignItems="center">
        <Text fontSize={'2xl'}>
          {type === 'Message' ? (
            <FiMail />
          ) : type === 'Interest' ? (
            <FaHeart />
          ) : (
            <FaUserSecret />
          )}
        </Text>
        <Text fontWeight="semibold">{title}</Text>
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          {description}
        </Text>
        {/* <Stack direction={{ base: 'column', md: 'row' }}>
          <Button variant="solid" colorScheme="green" onClick={markAsRead}>
            Mark as Read
          </Button>
        </Stack> */}
      </Stack>
      <Flex justifyContent={'flex-end'} pt={5} pr={5}>
        <Text>
          {date} {time}
        </Text>
      </Flex>
    </Stack>
  );
}
