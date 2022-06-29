import { Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
const Logo = (props) => {
  const arrayOfName = ['<\\>', '</>', '<|>', '<->'];
  const [logo, setLogo] = useState(arrayOfName[0]);
  const [index, setIndex] = useState(0);
  useInterval(() => {
    setIndex((index + 1) % 4);
    setLogo(arrayOfName[index]);
  }, 100);
  const color = useColorModeValue('cyan.600', 'cyan');
  return (
    <Text
      fontFamily={`'Source Code Pro', sans-serif`}
      color={color}
      fontWeight="bold"
      {...props}
    >
      {logo} 
    </Text>
  );
};

export default Logo;
