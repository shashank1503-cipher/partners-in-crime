import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import DevfolioHackathon from './DevfolioHackathon';
import MLHHackathon from './MLHHackathon';
import NewHackathons from './NewHackathons';

const MainContent = () => {
  return (
    <Flex direction={'column'}>
      <Heading textAlign={'center'} fontFamily={ `'Source Code Pro',sans-serif`}>Upcoming Hackathons</Heading>
      <NewHackathons />
      <Heading textAlign={'center'} fontFamily={ `'Source Code Pro',sans-serif`}>MLH Hackathons</Heading>
      <MLHHackathon />
      <Heading textAlign={'center'} fontFamily={ `'Source Code Pro',sans-serif`}>Devfolio Hackathons</Heading>
      <DevfolioHackathon />
      <Heading textAlign={'center'} fontFamily={ `'Source Code Pro',sans-serif`}>Project Ideas</Heading>
      <Text>Yahan Project Ideas dal denge </Text>
    </Flex>
  );
};

export default MainContent;
