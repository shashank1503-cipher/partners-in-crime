import { Heading } from '@chakra-ui/react';
import React from 'react';
import MyProjects from '../components/MyProjects';
import SidebarWithHeader from '../components/Sidebar';

const MyProjectsPage = () => {
  return (
    <SidebarWithHeader>
      <Heading textAlign={'center'} fontFamily={`'Source Code Pro',sans-serif`}>
        My Projects
      </Heading>
      <MyProjects />
    </SidebarWithHeader>
  );
};

export default MyProjectsPage;
