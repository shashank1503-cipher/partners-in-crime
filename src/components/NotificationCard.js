import React from 'react';
import { Stack, Text, Button, Flex } from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';
import { FaUserSecret } from 'react-icons/fa';

export default function NotificationCard(props) {
  let { title, description, date, time, type } = props.data;
  
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
          <Button variant="solid" colorScheme="green">
            Mark as Read
          </Button>
        </Stack>
      </Stack>
      <Flex justifyContent={'flex-end'} pt={5} pr={5}>
        <Text>{date} {time}</Text>
      </Flex>
    </Stack>
  );
}
