import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../context/AuthContext';
import DevfolioHackathon from './DevfolioHackathon';
import MLHHackathon from './MLHHackathon';
import NewHackathons from './NewHackathons';
import Projects from './Projects';

const MainContent = () => {
  let { token } = useAuth();
  let fetchFirstTimeLogin = async () => {
    try {
      const res = await fetch(`https://partners-in-crime-backend-production.up.railway.app/firsttimelogin`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        // console.log(data.data);
        if (data.data) {
          // console.log('first time');
          onOpen();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFirstTimeLogin();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();
  return (
    <>
      <Flex direction={'column'}>
        <Heading
          textAlign={'center'}
          fontFamily={`'Source Code Pro',sans-serif`}
        >
          Upcoming Hackathons
        </Heading>
        <NewHackathons />
        <Heading
          textAlign={'center'}
          fontFamily={`'Source Code Pro',sans-serif`}
        >
          MLH Hackathons
        </Heading>
        <MLHHackathon />
        <Heading
          textAlign={'center'}
          fontFamily={`'Source Code Pro',sans-serif`}
        >
          Devfolio Hackathons
        </Heading>
        <DevfolioHackathon />
        <Heading
          textAlign={'center'}
          fontFamily={`'Source Code Pro',sans-serif`}
        >
          Project Ideas
        </Heading>
        <Projects />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to Partners In Crime</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Head over to Profile Section to add Your Details
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                navigate('/profile');
              }}
            >
              Get Started
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainContent;
