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
const Logo = () => {
  const arrayOfName = ['<\\>', '</>', '<|>', '<->'];
  const [logo, setLogo] = useState(arrayOfName[0]);
  const [index, setIndex] = useState(0);
  useInterval(() => {
    setIndex((index + 1) % 4);
    setLogo(arrayOfName[index]);
  }, 100);
  return <>{logo}</>;
};

export default Logo;
