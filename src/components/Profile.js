import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
  Image,
  Box,
  IconButton,
  Select,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAuth from '../context/AuthContext';
import { FaPencilAlt } from 'react-icons/fa';

const Profile = () => {
  const { token } = useAuth();

  let color = useColorModeValue('gray.900', 'gray.50');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [imageError, setImageError] = useState('');
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [collg, setCollg] = useState('');
  const [batch, setBatch] = useState('');
  const [pronouns, setPronouns] = useState(3);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  const toast = useToast();
  console.log(image);
  const userData = async () => {
    try {
      const res = await fetch('http://localhost:8000/fetchuserprofile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log(data);

        setImageUrl(data['photo']);
        setPronouns('pronoun' in data ? data['pronoun'] : 3);
        setFirstName(data['name']);
        setLastName('lastName' in data ? data['lastName'] : '');
        setUsername('username' in data ? data['username'] : '');
        setMobile('mobile' in data ? data['mobile'] : '');
        setEmail(data['email']);
        setCollg('IIIT Kottayam');
        setBatch(data['batch']);
        setGithub('socials' in data ? data['socials'][0] : '');
        setLinkedIn('socials' in data ? data['socials'][1] : '');
        setSkills(data['skills']);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const uploadImage = async () => {
    console.log('Called');
    setUploading(true);

    if (image) {
      console.log('Sab sahi kaam krna chahiye');
      setUploading(true);
      let formData = new FormData();
      formData.append('file', image);

      try {
        formData.append('upload_preset', 'partnersInCrime');
        formData.append('cloud_name', 'dpjf6btln');
        let res = await fetch(
          'https://api.cloudinary.com/v1_1/dpjf6btln/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setImageUrl(data.url);

          try {
            res = await fetch('http://localhost:8000/updateuserpic', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ photo: data.url }),
            });

            toast({
              position: 'bottom-right',
              title: 'Profile Pic Updated',
              status: `${res.status === 200 ? 'success' : 'failure'}`,
              duration: 9000,
              isClosable: true,
            });
          } catch (e) {
            console.log(e);
          }
          setImageError('');
        } else {
          const data = await res.json();
          setImageError(data.error);
        }
      } catch (error) {
        setImageError(error.message);
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

  const queryData = async () => {
    setloading(true);
    const res = await fetch(`http://127.0.0.1:8000/suggestions?q=${query}`);
    if (res.status === 200) {
      const Data = await res.json();
      setData(Data.data);
    } else {
      const Data = await res.json();
      console.log(Data.detail);
    }
    setloading(false);
  };

  useEffect(() => {
    queryData();
  }, [query]);

  const updateUserData = async () => {
    try {
      setUploading(true);
      const data = {
        name: firstName,
        lastName: lastName,
        photo: imageUrl,
        skills: skills,
        batch: batch,
        socials: [github === '' ? '' : github, linkedIn === '' ? '' : linkedIn],
        username: username,
        mobile: mobile,
        pronoun: pronouns,
      };

      const res = await fetch('http://localhost:8000/updateuserprofile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      toast({
        position: 'bottom-right',
        title: 'Profile Updated',
        status: `${res.status === 200 ? 'success' : 'failure'}`,
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <Flex direction={'column'}>
        <Flex
          justifyContent={'space-evenly'}
          direction={['column', 'row']}
          align={'center'}
          my={['0', '2']}
        >
          <Heading
            fontFamily={`'Source Code Pro',sans-serif`}
            size={['2xl', '2xl']}
            my={['7', '0']}
          >
            Who are you? 🤔
          </Heading>
          <label for="picId">
            <Box
              position={'relative'}
              borderRadius={'full'}
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
              cursor={imageHover ? 'pointer' : 'auto'}
              borderColor={'teal'}
              borderWidth={3}
            >
              {imageHover && (
                <>
                  <IconButton
                    position={'absolute'}
                    top={'40%'}
                    left={'38%'}
                    colorScheme="teal"
                    cursor={'pointer'}
                    icon={<FaPencilAlt />}
                    isLoading={uploading}
                  />
                  <Input
                    id="picId"
                    type="file"
                    display={'none'}
                    aria-hidden="true"
                    accept="image/*"
                    cursor={'pointer'}
                    disabled={uploading}
                    onChange={e => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </>
              )}
              <Image
                _hover={{ opacity: '0.1' }}
                borderRadius="full"
                boxSize={['200px', '170px']}
                src={imageUrl === '' ? 'profile.png' : imageUrl}
                alt="Profile Pic"
                zIndex={-1}
              />
            </Box>
          </label>
        </Flex>
      </Flex>
      <Flex direction={'column'} alignItems={'center'}>
        <Flex
          mt={10}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          p={8}
          direction={['column', 'row']}
          w={'85%'}
        >
          <Flex direction={['column', 'row']} w={'100%'}>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
                Preferred Pronoun
              </Text>
              <Flex justifyContent={'center'}>
                <Select
                  variant={'filled'}
                  fontSize={'lg'}
                  placeholder={!pronouns && 'Select Pronoun'}
                  w={'80%'}
                  value={pronouns}
                  textAlign={['center', 'left']}
                  onChange={e => setPronouns(e.target.value)}
                >
                  <option value="0">He/Him</option>
                  <option value="1">She/Her</option>
                  <option value="2">They/Them</option>
                  <option value="3">Don't want to specify</option>
                </Select>
              </Flex>
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
          w={'85%'}
        >
          <Flex direction={['column', 'row']} w={'100%'}>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
                First Name<span style={{ color: 'red' }}>{''}*</span>
              </Text>
              <Input
                placeholder="Your First Name"
                size={['sm', 'md', 'lg', 'lg']}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                width={'80%'}
                required={true}
                textAlign={['center', 'left']}
                fontSize={'lg'}
              />
            </FormControl>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']} mt={['3', '0']}>
                Last Name
              </Text>
              <Input
                placeholder="Your Last Name"
                size={['sm', 'md', 'lg', 'lg']}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                width={'80%'}
                textAlign={['center', 'left']}
                fontSize={'lg'}
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
          w={'85%'}
        >
          <Flex direction={['column', 'row']} w={'100%'}>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
                Username<span style={{ color: 'red' }}>{''}*</span>
              </Text>
              <Input
                placeholder="Your Username"
                size={['sm', 'md', 'lg', 'lg']}
                value={username}
                onChange={e => setUsername(e.target.value)}
                width={'80%'}
                required={true}
                textAlign={['center', 'left']}
                fontSize={'lg'}
              />
            </FormControl>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']} mt={['3', '0']}>
                Email Id<span style={{ color: 'red' }}>{''}*</span>
              </Text>
              <Input
                placeholder="Your College Email Id"
                size={['sm', 'md', 'lg', 'lg']}
                value={email}
                onChange={e => setEmail(e.target.value)}
                width={'80%'}
                textAlign={['center', 'left']}
                fontSize={'lg'}
                disabled
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
          w={'85%'}
        >
          <Flex direction={['column', 'row']} w={'100%'}>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
                Mobile
              </Text>
              <Input
                placeholder="Your Mobile Number"
                size={['sm', 'md', 'lg', 'lg']}
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                width={'80%'}
                required={true}
                textAlign={['center', 'left']}
                fontSize={'lg'}
              />
            </FormControl>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']} mt={['3', '0']}>
                College/Institution
              </Text>
              <Input
                placeholder="Your College/Institution's Name"
                size={['sm', 'md', 'lg', 'lg']}
                value={collg}
                onChange={e => setCollg(e.target.value)}
                width={'80%'}
                textAlign={['center', 'left']}
                fontSize={'lg'}
                disabled
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
          w={'85%'}
        >
          <Flex direction={['column', 'row']} w={'100%'}>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
                Batch
              </Text>
              <Flex justifyContent={'center'}>
                <Select
                  variant={'filled'}
                  fontSize={'lg'}
                  w={'80%'}
                  placeholder={batch === '20XX' ? '20XX' : ''}
                  value={batch !== '20XX' ? batch : ''}
                  textAlign={['center', 'left']}
                  onChange={e => setBatch(e.target.value)}
                >
                  <option value="2021">Batch 2021</option>
                  <option value="2020">Batch 2020</option>
                  <option value="2019">Batch 2019</option>
                </Select>
              </Flex>
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
              Skills
            </Text>
            <Flex
              direction={'row'}
              flexWrap={'wrap'}
              w={'80%'}
              my={[0, 0, 0, 4]}
            >
              {skills.map(skill => {
                return (
                  <Box
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
              })}
            </Flex>
            <FormControl textAlign={'center'}>
              <Input
                type="text"
                size={['sm', 'md', 'lg', 'lg']}
                maxWidth={'80%'}
                textAlign={['center', 'left']}
                fontSize={'lg'}
                placeholder="Include skills you're familiar with"
                value={query}
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
              {loading ? (
                <></>
              ) : (
                data?.map(resu => (
                  <Button
                    mr={[0, 0, 0, 4]}
                    onClick={e => {
                      return setSkills(prev =>
                        Array.from(new Set([...prev, resu.name]))
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

        <Flex
          mt={10}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          p={8}
          direction={['column', 'row']}
          w={'85%'}
        >
          <Flex direction={['column', 'row']} w={'100%'}>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']}>
                Github Profile
              </Text>
              <Input
                placeholder="Your Github Profile Link"
                size={['sm', 'md', 'lg', 'lg']}
                value={github}
                onChange={e => setGithub(e.target.value)}
                width={'80%'}
                required={true}
                textAlign={['center', 'left']}
                fontSize={'lg'}
              />
            </FormControl>
            <FormControl textAlign={'center'}>
              <Text fontSize={['lg', 'lg']} mb={['3', '1']} mt={['3', '0']}>
                LinkedIn Profile
              </Text>
              <Input
                placeholder="Your LinkedIn Profile Link"
                size={['sm', 'md', 'lg', 'lg']}
                value={linkedIn}
                onChange={e => setLinkedIn(e.target.value)}
                width={'80%'}
                textAlign={['center', 'left']}
                fontSize={'lg'}
              />
            </FormControl>
          </Flex>
        </Flex>

        <Flex m={10}>
          <ButtonGroup spacing={10}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              onClick={updateUserData}
              isLoading={uploading}
            >
              Save Changes
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;
