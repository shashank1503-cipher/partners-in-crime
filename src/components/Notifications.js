import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import NotificationCard from './NotificationCard';

const Notifications = () => {
  let data = [
    {
      title: 'MLH Hackathon Invitation',
      description:
        'Bla Bla has invited you to participated in the MLH Hackathon.',
      date: 'Aug 29, 2020',
      time: '19:00',
      type: 'Invitation',
    },
    {
      title: 'New Message',
      description: 'Bla Bla has sent you a message',
      date: 'Aug 29, 2022',
      time: '19:00',
      type: 'Message',
    },
  ];
  return (
    <Flex direction={'column'} justifyContent={'center'} align={'center'} p={5}>
      <Heading textAlign={'center'} fontFamily={`'Source Code Pro',sans-serif`}>
        Notifications
      </Heading>
      {data.map((data, index) => {
        return <NotificationCard data={data} key={index} />;
      })}
    </Flex>
  );
};

export default Notifications;
