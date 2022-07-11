import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function ProfileCard(props) {
  let badgeBG = useColorModeValue('gray.50', 'gray.800');
  let id = props.id;
  let name = props.name;
  let img = props.photo;
  let email = props.email;
  let bio = props.bio;
  bio = bio ? (bio.length > 30 ? bio.substring(0, 30) + '...' : bio) : '';

  let skills = props.skills;
  let skillsAddOn =
    skills.length > 5 ? ' + ' + (props.skills.length - 5) + ' more' : '';

  skills = skills.length > 5 ? skills.slice(0, 5) : skills;
  let gId = props.gId;
  let navigate = useNavigate();
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={img}
            referrerPolicy={'no-referrer'}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            {email}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {bio}
          </Text>
          <Flex
            align={'center'}
            justify={'center'}
            direction={'row'}
            mt={6}
            wrap={'wrap'}
          >
            {skills.map(skill => (
              <Badge px={2} py={1} bg={badgeBG} fontWeight={'400'} m={1}>
                {skill}
              </Badge>
            ))}
            {skillsAddOn && (
              <Badge px={2} py={1} bg={badgeBG} fontWeight={'400'} m={1}>
                {skillsAddOn}
              </Badge>
            )}
          </Flex>

          <Stack
            width={'100%'}
            mt={'2rem'}
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              variant={'outline'}
              colorScheme={'cyan'}
              onClick={() => {
                navigate(`/messages?chat=${gId}`);
              }}
            >
              Message
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              colorScheme={'cyan'}
              onClick={() => {
                navigate(`/profile/${id}`);
              }}
            >
              View Profile
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
