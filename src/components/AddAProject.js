import {
  Box,
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
import useAuth from '../context/AuthContext';

const AddAProject = () => {
  let color = useColorModeValue('gray.900', 'gray.50');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryLoading, setQueryLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const toast = useToast();

  let { token } = useAuth();
  useEffect(() => {
    const queryData = async () => {
      setQueryLoading(true);
      const res = await fetch(
        `https://partners-in-crime-backup.herokuapp.com/skillssuggestions?q=${query}`
      );
      if (res.status === 200) {
        const Data = await res.json();
        setData(Data.data);
      } else {
        const Data = await res.json();
        console.log(Data.detail);
      }
      setQueryLoading(false);
    };
    if (query) {
      queryData();
    }
  }, [query]);
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
          toast({
            title: 'Error',
            description: `${data.error} - ${res.status}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        setImageError(error.message);
        toast({
          title: 'Error',
          description: `Something went wrong - ${error.message}`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
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
    if (!skills) {
      setLoading(false);
      toast({
        title: 'Please enter at least one skill',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    let data = {
      image_url: imageUrl,
      title: title,
      description: shortDesc,
      idea: description,
      skills: skills,
    };
    try {
      const res = await fetch(
        'https://partners-in-crime-backup.herokuapp.com/addproject',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status === 200) {
        toast({
          title: 'Project Added Successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setTitle('');
        setShortDesc('');
        setDescription('');
        setSkills('');
        setImageUrl('');
        setImage(null);
        localStorage.removeItem('title');
        localStorage.removeItem('shortDesc');
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
    try {
      localStorage.setItem('title', title);
      localStorage.setItem('shortDesc', shortDesc);
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
    } catch (error) {
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
    setShortDesc(localStorage.getItem('shortDesc'));
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
          A short pitch about your project
        </Text>
        <FormControl>
          <Textarea
            placeholder="Your Idea"
            value={shortDesc}
            onChange={e => setShortDesc(e.target.value)}
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
        direction={['column', 'row']}
        w={'85%'}
        transition={'all 0.3s ease-in-out'}
      >
        <Flex
          direction={'column'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
            Skills<span style={{ color: 'red' }}>{''}*</span>
          </Text>
          <Flex direction={'row'} flexWrap={'wrap'} w={'80%'} my={[0, 0, 0, 4]}>
            {skills ? (
              skills.map((skill, index) => {
                return (
                  <Box
                    key={index}
                    mr={[2, 2, 2, 4]}
                    p={2}
                    mb={[2, 2, 2, 2]}
                    borderColor={'teal'}
                    fontSize={['sm', 'sm', 'sm', 'lg']}
                    borderWidth={1}
                    rounded={'lg'}
                    _hover={{ backgroundColor: '#81E6D9', color: 'black' }}
                    transition={'all 0.3s ease-in-out'}
                  >
                    {skill}
                    <Box
                      color={'red'}
                      ml={'2'}
                      cursor={'pointer'}
                      display={'inline'}
                      _hover={{ color: 'white' }}
                      onClick={() => {
                        return setSkills(prev => prev.filter(s => s !== skill));
                      }}
                    >
                      &#x2715;
                    </Box>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </Flex>
          <FormControl textAlign={'center'}>
            <Input
              type="text"
              size={['sm', 'md', 'lg', 'lg']}
              maxWidth={'80%'}
              textAlign={['center', 'left']}
              fontSize={'lg'}
              placeholder="Skills required"
              value={query ?? ''}
              onChange={e => {
                setQuery(e.target.value);
              }}
            />
          </FormControl>
          <Flex
            w={'80%'}
            bg={useColorModeValue('white', 'gray.900')}
            rounded={'md'}
            overflow={'hidden'}
            pt={4}
            direction={['column', 'column', 'column', 'row']}
            justifyContent={['center', 'center', 'center', 'flex-start']}
            flexWrap={['nowrap', 'nowrap', 'nowrap', 'wrap']}
          >
            {queryLoading ? (
              <></>
            ) : (
              data?.map((resu, index) => (
                <Button
                  key={index}
                  mr={[0, 0, 0, 4]}
                  onClick={e => {
                    return setSkills(prev =>
                      prev
                        ? Array.from(new Set([...prev, resu.name]))
                        : [resu.name]
                    );
                  }}
                  my={[2, 2, 2, 2]}
                >
                  {resu.name}
                </Button>
              ))
            )}
          </Flex>
        </Flex>
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
