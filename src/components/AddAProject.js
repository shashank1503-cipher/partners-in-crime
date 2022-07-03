import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';

const AddAProject = () => {
  let color = useColorModeValue('gray.900', 'gray.50');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  let uploadImage = async () => {
    setUploading(true);
    if (image) {
      setUploading(true);
      let formData = new FormData();
      formData.append('file', image);
      try {
        formData.append('upload_preset', 'partnersInCrime');
        formData.append('cloud_name', 'dpjf6btln');
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dpjf6btln/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setImageUrl(data.url);
          setImageError('');
          toast({
            title: 'Image Uploaded Successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          const data = await res.json();
          setImageError(data.error);
          console.log(data.error);
        }
      } catch (error) {
        setImageError(error.message);
        console.log(error.message);
      } finally {
        setUploading(false);
        setImage(null);
      }
    } else {
      setImageError('Please select an image');
      setUploading(false);
    }
  };
  let sendData = async () => {
    setLoading(true);
    let token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUHJhZHl1bW5hIFBhdGlsIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnpMZDc2R0czbzNwWjZVSXFkV3ZoS0ZNQkRPbGpOQUtQeHNabHJ0VlE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20venRvY2tzLWF1dGgiLCJhdWQiOiJ6dG9ja3MtYXV0aCIsImF1dGhfdGltZSI6MTY0Nzg3NjQxNiwidXNlcl9pZCI6Ik1WR1NEOFNsYUVXalRHYjJRTzlSZERUSjBVcTIiLCJzdWIiOiJNVkdTRDhTbGFFV2pUR2IyUU85UmREVEowVXEyIiwiaWF0IjoxNjQ3ODc2NDE2LCJleHAiOjE2NDc4ODAwMTYsImVtYWlsIjoicHJhZHl1bW5hcmFqZS5wYXRpbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiKzkxOTEzMDA0NDE2MSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDg5MTcwNzc1NTkyODY5NDEzODkiXSwicGhvbmUiOlsiKzkxOTEzMDA0NDE2MSJdLCJlbWFpbCI6WyJwcmFkeXVtbmFyYWplLnBhdGlsQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.ayCuupceExjo62yVIktdPo616IhkLHAFtJRZxuVbcePybWdKTI8Ajim5nSwfYwRWHh7EKdlR9LqOLflj2jlJbCSVJ7WmHTBQfBQkrHhCh7sWMFT7l_yY5DaeQnZgz3cZ2P2O_9k03JmEyYlSsOP4giz3CHsVUXyqmfkO0Fq-QlYN5H-i5c5sr0N629kaNJLrRXbfjiHjgkL87km7pflzSKlFXH6KmDptJwLkWkINZ4ofmW7xdLsFjecjrepI9ByX5owjt5cwKXHVvcYOTLCa45_8xEbhg8iJrQlDWui0AFxDYD8rFRsb3vnDs4FIFbzAp6oniQSGw2Y5sJBO6ACDsA';
    let skillArr = skills.split(' ');
    let data = {
      image_url: imageUrl,
      title: title,
      idea: description,
      skills: skillArr,
    };
    try {
      const res = await fetch('http://127.0.0.1:8000/addproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        toast({
          title: 'Project Added Successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setTitle('');
        setDescription('');
        setSkills('');
        setImageUrl('');
        setImage(null);
        localStorage.removeItem('title');
        localStorage.removeItem('description');
        localStorage.removeItem('skills');
        localStorage.removeItem('image');
        localStorage.removeItem('imageUrl');
        
      } else {
        const data = await res.json();
        toast({
          title: data.detail,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  let saveDraft = () => {
    try{
    localStorage.setItem('title', title);
    localStorage.setItem('description', description);
    localStorage.setItem('skills', skills);
    localStorage.setItem('imageUrl', imageUrl);
    localStorage.setItem('image', image);
    toast({
      title: 'Draft Saved',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

    }catch(error){
      toast({
        title: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  let loadDraft = () => {
    
    setTitle(localStorage.getItem('title'));
    setDescription(localStorage.getItem('description'));
    setSkills(localStorage.getItem('skills'));
    setImageUrl(localStorage.getItem('imageUrl'));
    setImage(localStorage.getItem('image'));
  };
  useEffect(() => {
    uploadImage();
  }, [image]);
  useEffect(() => {
    loadDraft();
  }, []);

  return (
    <Flex justifyContent={'center'} direction={'column'} align={'center'}>
      <Heading fontFamily={`'Source Code Pro',sans-serif`}>
        Got a Cool Idea 😏
      </Heading>
      <Text color={color} fontSize={'lg'} mt={5}>
        {' '}
        Let's make it Real 😎
      </Text>
      <Flex
        mt={10}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        p={8}
        direction={'column'}
        w={['sm', 'md', 'lg', 'xl']}
      >
        <Button
          colorScheme={'teal'}
          leftIcon={<FaImage />}
          isLoading={uploading}
        >
          Add Image
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            cursor={'pointer'}
            disabled={uploading}
            onChange={e => {
              setImage(e.target.files[0]);
            }}
          />
        </Button>

        {imageUrl && (
          <>
            <Text
              fontFamily={`'Source Code Pro',sans-serif`}
              textAlign={'center'}
              mt={4}
            >
              Preview
            </Text>
            <Image src={imageUrl} alt="project" />
          </>
        )}
      </Flex>
      <Flex
        mt={10}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        p={8}
        direction={'column'}
        w={['sm', 'md', 'lg', 'xl']}
      >
        <Text
          fontFamily={`'Source Code Pro',sans-serif`}
          textAlign={'center'}
          mb={4}
        >
          Well what's in the name, but still
        </Text>
        <FormControl>
          <Input
            placeholder="Your Project Name"
            size={['sm', 'md', 'lg', 'lg']}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex
        mt={10}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        p={8}
        direction={'column'}
        align={'center'}
        w={['sm', 'md', 'lg', 'xl']}
        justifyContent={'center'}
      >
        <Text
          fontFamily={`'Source Code Pro',sans-serif`}
          textAlign={'center'}
          mb={4}
        >
          Billion Dollar Idea
        </Text>
        <FormControl>
          <Textarea
            placeholder="Your Idea"
            rowGap={4}
            boxSize={['xs', 'sm', 'md', 'lg']}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex
        mt={10}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        p={8}
        direction={'column'}
        align={'center'}
        w={['sm', 'md', 'lg', 'xl']}
      >
        <FormControl>
          <Text
            fontFamily={`'Source Code Pro',sans-serif`}
            textAlign={'center'}
            mb={4}
          >
            For your one hell of a team
          </Text>
          <Input
            placeholder="Skills You Require"
            size={['sm', 'md', 'lg', 'lg']}
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex m={10}>
        <ButtonGroup spacing={10}>
          <Button
            variant={'solid'}
            colorScheme={'teal'}
            onClick={sendData}
            isLoading={loading}
          >
            Post Idea
          </Button>
          <Button variant={'solid'} disabled={loading} onClick={saveDraft}>
            Save Draft
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default AddAProject;
