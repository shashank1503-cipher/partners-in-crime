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
    Icon,
    Select
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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [collg, setCollg] = useState('');
    const [courseSpl, setCourseSpl] = useState(null);
    const [studyYear, setStudyYear] = useState(null);
    const [pronouns, setPronouns] = useState(null);
    const [github, setGithub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');    

    const toast = useToast();
    
    useEffect(() => {
        // dummy fetch user data
        const userData = async () => {
            setImageUrl("profile.png");
            setPronouns(1);
            setFirstName('Veronica');
            setLastName('Shrivastava');
            setUsername('*man');
            setMobile('9876543210');
            setEmail('abc@iiitkottayam.ac.in');
            setCollg('IIIT Kottayam');
            setCourseSpl(0);
            setStudyYear(2);
            setGithub('');
            setLinkedIn('');
        };
        userData();
    }, []);

    // post data changes yet to be made

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
                    setImage(null);
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
        <>
        <Flex direction={'column'}>
            <Flex justifyContent = {'space-evenly'} direction = {['column', 'row']} align = {'center'} my = {["0", "2"]}>
                <Heading fontFamily={`'Source Code Pro',sans-serif`} size = {["2xl", "2xl"]} my = {["7", "0"]}>
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
                                left = {'38%'}
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
        </Flex> 
        <Flex direction = {'column'} alignItems = {'center'}>   
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={['column', 'row']}
                w = {'85%'}
            >
                <Flex direction = {['column','row']} w = {'100%'}>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']}>Preferred Pronoun</Text>
                        <Flex justifyContent = {'center'}><Select variant = {'filled'} fontSize = {'lg'} placeholder = {!pronouns && 'Select Pronoun'} w = {'80%'} value = {pronouns} textAlign = {['center', 'left']}>
                            <option value = '0'>He/Him</option>
                            <option value = '1'>She/Her</option>
                            <option value = '2'>They/Them</option>
                        </Select></Flex>
                    </FormControl>
                </Flex>
            </Flex>
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={['column', 'row']}
                w = {'85%'}
            >
                <Flex direction = {['column','row']} w = {'100%'}>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']}>First Name<span style = {{color: 'red'}}>{''}*</span></Text>
                        <Input
                            placeholder="Your First Name"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            width = {'80%'}
                            required = {true}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                    <FormControl textAlign = {'center'}>
                    <Text fontSize = {['lg', 'lg']} mb = {['3', '1']} mt = {['3', '0']}>Last Name</Text>
                        <Input
                            placeholder="Your Last Name"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            width = {'80%'}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                </Flex>
            </Flex>
            
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={['column', 'row']}
                w = {'85%'}
            >
                <Flex direction = {['column','row']} w = {'100%'}>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']}>Username<span style = {{color: 'red'}}>{''}*</span></Text>
                        <Input
                            placeholder="Your Username"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            width = {'80%'}
                            required = {true}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                    <FormControl textAlign = {'center'}>
                    <Text fontSize = {['lg', 'lg']} mb = {['3', '1']} mt = {['3', '0']}>Email Id<span style = {{color: 'red'}}>{''}*</span></Text>
                        <Input
                            placeholder="Your College Email Id"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            width = {'80%'}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                </Flex>
            </Flex>
            
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={['column', 'row']}
                w = {'85%'}
            >
                <Flex direction = {['column','row']} w = {'100%'}>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']}>Mobile</Text>
                        <Input
                            placeholder="Your Mobile Number"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                            width = {'80%'}
                            required = {true}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                    <FormControl textAlign = {'center'}>
                    <Text fontSize = {['lg', 'lg']} mb = {['3', '1']} mt = {['3', '0']}>College/Institution</Text>
                        <Input
                            placeholder="Your College/Institution's Name"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={collg}
                            onChange={e => setCollg(e.target.value)}
                            width = {'80%'}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                </Flex>
            </Flex>

            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={['column', 'row']}
                w = {'85%'}
            >
                <Flex direction = {['column', 'row']} w = {'100%'}>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']}>Course Specialisation</Text>
                        <Flex justifyContent = {'center'}><Select variant = {'filled'} fontSize = {'lg'} placeholder = {!courseSpl && 'Select course specialisation'} w = {'80%'} value = {courseSpl} textAlign = {['center', 'left']}>
                            <option value = '0'>Computer Science and Engineering</option>
                            <option value = '1'>Computer Science and Engineering - CyberSec</option>
                            <option value = '2'>Electronics and Communication Engineering</option>
                        </Select></Flex>
                    </FormControl>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']} mt = {['3', '0']}>Study Year<span style = {{color: 'red'}}>{''}*</span></Text>
                        <Flex justifyContent = {'center'}><Select variant = {'filled'} fontSize = {'lg'} placeholder = {!studyYear && 'Select Study year'} w = {'80%'} value = {studyYear} textAlign = {['center', 'left']}>
                            <option value = '0'>1st Year</option>
                            <option value = '1'>2nd Year</option>
                            <option value = '2'>3rd Year</option>
                            <option value = '3'>4th Year</option>
                        </Select></Flex>
                    </FormControl>
                </Flex>
            </Flex>
            
            <Flex
                mt={10}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                p={8}
                direction={['column', 'row']}
                w = {'85%'}
            >
                <Flex direction = {['column','row']} w = {'100%'}>
                    <FormControl textAlign = {'center'}>
                        <Text fontSize = {['lg', 'lg']} mb = {['3', '1']}>Github Profile</Text>
                        <Input
                            placeholder="Your Github Profile Link"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={github}
                            onChange={e => setGithub(e.target.value)}
                            width = {'80%'}
                            required = {true}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                    <FormControl textAlign = {'center'}>
                    <Text fontSize = {['lg', 'lg']} mb = {['3', '1']} mt = {['3', '0']}>LinkedIn Profile</Text>
                        <Input
                            placeholder="Your LinkedIn Profile Link"
                            size={['sm', 'md', 'lg', 'lg']}
                            value={linkedIn}
                            onChange={e => setLinkedIn(e.target.value)}
                            width = {'80%'}
                            textAlign = {['center', 'left']}
                            fontSize = {'lg'}
                        />
                    </FormControl>
                </Flex>
            </Flex>

            <Flex m={10}>
                <ButtonGroup spacing={10}>
                    <Button variant={'solid'} colorScheme={'teal'}>
                        Save Changes
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>    
        </>
    );
};

export default Profile;
  