import {
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    Heading,
    Input,
    Text,
    Textarea,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';

const Profile = () => {
  let color = useColorModeValue('gray.900', 'gray.50');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
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
  useEffect(() => {
    uploadImage();
  }, [image]);

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
          <Button variant={'solid'} colorScheme={'teal'}>
            Post Idea
          </Button>
          <Button variant={'solid'}>Save Draft</Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default Profile;
  