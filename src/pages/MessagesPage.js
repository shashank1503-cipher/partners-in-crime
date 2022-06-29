import React from 'react';
import Messages from '../components/Messages';
import SidebarWithHeader from '../components/Sidebar';

const MessagesPage = () => {
  return (
    <SidebarWithHeader>
      <Messages />
    </SidebarWithHeader>
  );
};

export default MessagesPage;
