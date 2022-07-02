import React from 'react';
import {
  Box
} from '@chakra-ui/react';
import Messages from '../components/Messages';
import SidebarWithHeader from '../components/Sidebar';

const MessagesPage = () => {
  return (
    <Box overflow={'hidden'} position={'relative'}>

    <SidebarWithHeader>
      <Messages />
    </SidebarWithHeader>
    </Box>
  );
};

export default MessagesPage;
