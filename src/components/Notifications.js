import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NotificationCard from './NotificationCard';

const Notifications = () => {
  const [newData, setNewData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    let token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4OTdjZjk0NTllMjU0ZmYxYzY3YTRlYjZlZmVhNTJmMjFhOWJhMTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2hhc2hhbmsgU3JpdmFzdGF2YSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaWFBT1lxcHBhaUZVMy1WUlVDVzlyWmJJdlhZR25ZaDJSc3FmYWVVQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wYXJ0bmVycy1pbi1jcmltZS0zODMwOSIsImF1ZCI6InBhcnRuZXJzLWluLWNyaW1lLTM4MzA5IiwiYXV0aF90aW1lIjoxNjU2NjU2NTAwLCJ1c2VyX2lkIjoiNGxiRVR1c2lnWmRLT2VqTzVabjZCbjlrRUczMiIsInN1YiI6IjRsYkVUdXNpZ1pkS09lak81Wm42Qm45a0VHMzIiLCJpYXQiOjE2NTY2NTY1MDAsImV4cCI6MTY1NjY2MDEwMCwiZW1haWwiOiJzaGFzaGFuay5zcml2YXN0YXZhMjVza3NAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ0MDg1OTEwODkyOTkzNzYwMTgiXSwiZW1haWwiOlsic2hhc2hhbmsuc3JpdmFzdGF2YTI1c2tzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.fO8aaE5aTdQlcLDd_siOXmQ7WcAS611eDPUF9psOyolnCKcIf8xx_u5O5Iv182E_o_2VKUbpS6rbP_EDGMHOSVuD8QMVa46rUhHGruiQ-XbwCgaj1edrxtvrDaoBiItaANpZL5R_P4DNXf_VutzMDwRmT2_5LMykvyjCHK1otXD394pBQ1xe-uyEnCsrjIHVMTJPIID4KwyJU7_5Sfxy77-xgFb_thjxZG8tkiB5rUHb1WNmZIKOvOA0gpnn_e6eDSNNd74EKcZUG6wMERhZWux5KhfTxWmgInMwmUqljW7xTXjm0noQxvkN6KMsGrlXJNuNsknSUSfwwxPYjurIfQ';
    try {
      const res = await fetch('http://127.0.0.1:8000/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
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
      return object.id === 3;
    });
    newData.splice(indexOfObject, 1);
    setNewData(newData);
    setOldData([...oldData, newData[indexOfObject]]);
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
        newData.map((data, index) => {
          return (
            <NotificationCard data={data} key={index} markAsRead={markAsRead} />
          );
        })
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
