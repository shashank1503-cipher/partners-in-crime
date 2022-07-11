import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Logo from '../components/Logo';
import Messages from '../components/Messages';
import SidebarWithHeader from '../components/Sidebar';
import useApp from '../context/AppContext';

const MessagesPage = () => {

  const {messagesLoading} = useApp()

  useEffect(() => {

    console.log(messagesLoading)

  }, [messagesLoading])

  return (
      <Box
        position={'relative'}
        w={'full'}
      >

    <SidebarWithHeader>

    
    {messagesLoading?<Logo 
      fontSize={"7xl"}
      position="relative"
      alignSelf="center"
      textAlign="center"
      top="10vh"
      verticalAlign="center"
      />
      
      :
      
      <Messages/>
      
    }
    </SidebarWithHeader>
    </Box>
  );
};

export default MessagesPage;
