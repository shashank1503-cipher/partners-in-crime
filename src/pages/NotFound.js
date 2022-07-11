import { Flex, Heading, Text, Button } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Flex
      direction="column"
      textAlign="center"
      minH={'100vh'}
      align={'center'}
      justifyContent={'center'}
    >
      <Heading
        fontFamily={`'Source Code Pro',sans-serif`}
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, cyan.400, cyan.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        colorScheme={'cyan'}
        variant="solid"
        onClick={() => {
            window.location.href = '/';
        }}
      >
        Go to Home
      </Button>
    </Flex>
  );
}
