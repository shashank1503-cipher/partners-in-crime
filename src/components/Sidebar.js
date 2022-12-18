import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {
  FiHome,
  FiMessageSquare,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPlus,
} from 'react-icons/fi';
import { FaUserSecret } from 'react-icons/fa';
import Name from './Names';
import Logo from './Logo';
import { Link as NavLink } from 'react-router-dom';
import StatusIndicator from './StatusIndicator';
import useAuth from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LinkItems = [
  { name: 'Home', icon: FiHome, url: '/main' },
  { name: 'Find a Partner', icon: FaUserSecret, url: '/find' },
  { name: 'Add a Project', icon: FiPlus, url: '/add' },
  { name: 'Messages', icon: FiMessageSquare, url: '/messages' },
  { name: 'Notifications', icon: FiBell, url: '/notifications', new: false },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { token } = useAuth();
  useEffect(() => {
    let fetchNewNotification = async () => {
      try {
        let res = await fetch(`https://anplt2s03b.execute-api.ap-south-1.amazonaws.com/dev/isNewnotification`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        let data = await res.json();
        if (res.status === 200) {
          // console.log(data);
          // console.log(data.data);
          if (data.data) {
            // console.log('new notification');
            LinkItems[4].new = true;
          } else {
            LinkItems[4].new = false;
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewNotification();
  }, [token]);
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <NavLink to = '/main'><Logo fontSize="2xl" /></NavLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem
          icon={link.icon}
          url={link.url}
          badge={link.new}
          onClick={() => {
            if (link.new === true) {
              LinkItems[4].new = false;
            }
          }}
          key={index}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ url, icon, badge, children, ...rest }) => {
  return (
    <NavLink to={url}>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.700',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <>
              {badge && <StatusIndicator mt={-5} />}
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
              />
            </>
          )}
          {children}
        </Flex>
      </Link>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const [imageURL, setImageURL] = useState();
  const [name, set_name] = useState();
  let { user, logout, token } = useAuth();
  // let name = user.name.split(' ')[0];
  let navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const res = await fetch("https://anplt2s03b.execute-api.ap-south-1.amazonaws.com/dev/fetchuserprofile", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data)
      setImageURL(data["photo"])
      set_name(data['name'])
    }
    fetchProfilePhoto();
  }, [token])

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'none', md: 'flex' }}
        fontSize={['sm', 'md', 'md', 'md']}
        fontFamily={`'Source Code Pro', sans-serif`}
        color={useColorModeValue('cyan.600', 'cyan')}
        fontWeight="bold"
      >
     
        {/* <Name /> */}
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <ColorModeSwitcher />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} src={imageURL} referrerPolicy="no-referrer" />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{name}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <NavLink to="/profile">
                <MenuItem>Profile</MenuItem>
              </NavLink>
              <MenuItem onClick={() => {
                  navigate('/favouritehackathons');
                }}>Favourite Hackathons</MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/myprojects');
                }}
              >
                My Projects
              </MenuItem>
              <MenuDivider  borderColor={useColorModeValue('gray.200', 'gray.600')} />
              <MenuItem onClick={logout} color='tomato'>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
