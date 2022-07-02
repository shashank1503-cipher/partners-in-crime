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
import Profile from './pages/ProfilePage';
import useAuth from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  let { user } = useAuth();

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/find"
          element={
            <PrivateRoute>
              <FindPartnerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddAProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <MessagesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
