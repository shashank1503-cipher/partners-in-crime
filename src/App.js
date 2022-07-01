import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/source-code-pro/700.css';
import '@fontsource/roboto/400.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

import FindPartnerPage from './pages/FIndPartnerPage';
import AddAProjectPage from './pages/AddAProjectPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import Landing from './pages/Landing';
import useAuth from './context/AuthContext';
import Searchpage from './pages/Searchpage';

function App() {

  let {user} = useAuth();
  
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/find" element={<FindPartnerPage />} />
        <Route path="/add" element={<AddAProjectPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search" element={<Searchpage/>}/>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
