import { Heading } from '@chakra-ui/react';
import React from 'react';
import FavouriteHackathons from '../components/FavouriteHackathons';
import SidebarWithHeader from '../components/Sidebar';

const FavouriteHackathonsPage = () => {
  return (
    <SidebarWithHeader>
      <Heading textAlign={'center'} fontFamily={`'Source Code Pro',sans-serif`}>
        Favourite Hackathons
      </Heading>
      <FavouriteHackathons />
    </SidebarWithHeader>
  );
};

export default FavouriteHackathonsPage;
