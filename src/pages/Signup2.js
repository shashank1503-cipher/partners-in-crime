import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
export default function Signup2() {
  const [skills, setSkills] = useState('');
  const defaulskills = [
    { name: 'Frontend', id: 1 },
    { name: 'Backend', id: 2 },
    { name: 'Fullstack', id: 3 },
    { name: 'Devops', id: 4 },
    { name: 'React', id: 5 },
    { name: 'Angular', id: 6 },
    { name: 'Django', id: 7 },
  ];
  return (
    <Flex
      minH={'100vh'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      direction={'column'}
    >
      <Flex justifyContent={'flex-end'} mt={5} mr={5}>
        <ColorModeSwitcher />
      </Flex>
      <Flex align={'center'} justify={'center'} direction={'column'}>
        <Heading
          fontFamily={`'Source Code Pro', sans-serif`}
          color={useColorModeValue('cyan.600', 'cyan')}
          fontSize={['4xl', '4xl', '5xl', '5xl']}
        >
          {' '}
          &lt;partnersInCrime&gt;
        </Heading>{' '}
        <Stack
          spacing={8}
          mx={'auto'}
          minW={['sm', 'md', 'md', 'md']}
          py={12}
          px={6}
        >
          <Stack align={'center'}>
            <Heading
              fontSize={['3xl', '3xl', '4xl', '5xl']}
              textAlign={'center'}
            >
              Sign up
            </Heading>
            <Text fontSize={['sm', 'md', 'md', 'lg']} color={'gray.600'}>
              Add your{' '}
              <Text
                display={'inline'}
                color={useColorModeValue('cyan.600', 'cyan')}
              >
                Skills
              </Text>{' '}
              and expertises
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="Skills" isRequired>
                <FormLabel>Skills</FormLabel>
                <Input
                  type="text"
                  placeholder={'Add Your Skills Here'}
                  value={skills}
                  onChange={e => {
                    setSkills(e.target.value);
                  }}
                />
              </FormControl>
              <Flex
                flexWrap={'wrap'}
                justifyContent={'space-between '}
                align="center"
              >
                {defaulskills.map(skill => (
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    margin={2}
                    onClick={() => {
                      setSkills(skills + ' ' + skill.name);
                    }}
                  >
                    {skill.name}
                  </Button>
                ))}
              </Flex>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
}
