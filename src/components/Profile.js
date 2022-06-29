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
    Image,
    Box,
    IconButton,
    Icon
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaImage, FaPencilAlt } from 'react-icons/fa';

const Profile = () => {
    let color = useColorModeValue('gray.900', 'gray.50');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imageHover, setImageHover] = useState(false);
    const [imageError, setImageError] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const toast = useToast();
    
    useEffect(() => {
        const userData = async () => {
            setImageUrl("profile.png");
        };
        userData();
    }, []);

    useEffect(() => {
        const uploadImage = async () => {
            
            setUploading(true);
    
            if(image){
                setUploading(true);
                let formData = new FormData();
                formData.append('file', image);
    
                try{
                    formData.append('upload_preset', 'z4pkkeb2');
                    formData.append('cloud_name', 'dikr8bxj7');
                    const res = await fetch(
                        'https://api.cloudinary.com/v1_1/dikr8bxj7/image/upload', {
                            method: 'POST',
                            body: formData,
                    });
                    if(res.status === 200){
                        const data = await res.json();
                        setImageUrl(data.url);
                        setImageError('');

                        toast({
                            position: "bottom-right",
                            title: 'Profile Pic Updated',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                    else{
                        const data = await res.json();
                        setImageError(data.error);
                        console.log(data.error);
                    }
                } 
                catch(error){
                    setImageError(error.message);
                    console.log(error.message);
                } 
                finally{
                    setUploading(false);
                }
            }
            else{
                setImageError('Please select an image');
                setUploading(false);
            }
        };

        uploadImage();
    }, [image, toast]);

    return (
        <Flex direction={'column'}>
            <Flex justifyContent = {'space-evenly'} direction = {['column', 'row']} align = {'center'} my = {["0", "2"]}>
                <Heading fontFamily={`'Source Code Pro',sans-serif`} size = {["2xl", "xl"]} my = {["7", "0"]}>
                    Who are you? 🤔	
                </Heading>
                <label for = "picId"><Box
                    position = {'relative'}
                    borderRadius = {'full'}
                    onMouseEnter = {() => setImageHover(true)}
                    onMouseLeave = {() => setImageHover(false)}
                    cursor = {imageHover ? 'pointer' : 'auto'}
                    borderColor = {'teal'}
                    borderWidth = {3}
                >
                    {imageHover && 
                        <>
                            <IconButton 
                                position = {'absolute'}
                                top = {'40%'}
                                left = {'40%'}
                                colorScheme='teal'
                                cursor = {'pointer'}
                                icon = {<FaPencilAlt />}
                                isLoading = {uploading}
                            />
                            <Input
                                id = "picId"
                                type = "file"
                                display = {'none'}
                                aria-hidden="true"
                                accept="image/*"
                                cursor={'pointer'}
                                disabled={uploading}
                                onChange={e => {
                                    setImage(e.target.files[0]);
                                }}
                            /> 
                        </>
                        
                    }
                    <Image
                        _hover = {{opacity: '0.1'}}
                        borderRadius = 'full'
                        boxSize = {['200px', '170px']}
                        src = {imageUrl}
                        alt = 'Profile Pic'
                        zIndex = {-1}
                    />
                </Box></label>
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
  