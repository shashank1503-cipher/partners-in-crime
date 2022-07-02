import React, { useState } from 'react';
import { Stack, Text, Button, Flex } from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';
import { FaUserSecret } from 'react-icons/fa';

export default function NotificationCard(props) {
  let { title, description, date, time, type, _id } = props.data;
  const [loading, setLoading] = useState(false);
  let markAsRead = async () => {
    setLoading(true);
    let response = await fetch(`http://127.0.0.1:8000/notifications/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          {type === 'Message' ? <FiMail /> : <FaUserSecret />}
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
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Button variant="solid" colorScheme="green" onClick={markAsRead}>
            Mark as Read
          </Button>
        </Stack>
      </Stack>
      <Flex justifyContent={'flex-end'} pt={5} pr={5}>
        <Text>
          {date} {time}
        </Text>
      </Flex>
    </Stack>
  );
}
