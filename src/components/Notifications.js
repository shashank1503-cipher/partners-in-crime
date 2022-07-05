import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useAuth from '../context/AuthContext';
import Logo from './Logo';
import NotificationCard from './NotificationCard';

const Notifications = () => {
  const [newData, setNewData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  let { token } = useAuth();
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setTotalRecords(data.meta.total_records);
        setNewData(data.data.new);
        setOldData(data.data.read);
        setError('');
      } else {
        const data = await res.json();
        setError(data.detail);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let markAsRead = id => {
    const indexOfObject = newData.findIndex(object => {
      return object.id;
    });
    newData.splice(indexOfObject, 1);
    setNewData(newData);
    console.log(newData);
    setOldData([...oldData, newData[indexOfObject]]);
    console.log(oldData);
  };

  return (
    <Flex direction={'column'} justifyContent={'center'} align={'center'} p={5}>
      <Heading textAlign={'center'} fontFamily={`'Source Code Pro',sans-serif`}>
        Notifications
      </Heading>
      {loading ? (
        <Logo />
      ) : error ? (
        <Alert>
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : totalRecords > 0 ? (
        <>
          {newData.length > 0 ? (
            <ListOfNotifications data={newData} type="New" />
          ) : (
            <Text>No New Notifications</Text>
          )}

          <ListOfNotifications data={oldData} type="Old" />
        </>
      ) : (
        <Alert>
          <AlertIcon />
          <AlertTitle>No Notifications</AlertTitle>
          <AlertDescription>You have no notifications</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};

export default Notifications;

let ListOfNotifications = ({ data, type }) => {
  return (
    <Stack direction={'column'} mt={10} w={'full'}>
      <Heading textAlign={'center'}>{type} Notifications</Heading>
      {data.map((data, index) => {
        return <NotificationCard data={data} key={index} />;
      })}
    </Stack>
  );
};
