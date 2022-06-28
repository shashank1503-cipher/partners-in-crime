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
const Name = props => {
  const arrayOfName = [
    "print('Let's build something cool!')",
    "System.out.println('Let's build something cool!');",
    "cout << 'Let's build something cool!';",
    " console.log('Let's build something cool!');",
    "<h1>Let's build something cool!</h1>",
    "printf('Let's build something cool!');",
    " Console.WriteLine ('Let's build something cool!');",
  ];
  const [names, setNames] = useState(arrayOfName[0]);
  useInterval(() => {
    var index = Math.floor(Math.random() * 7);
    setNames(arrayOfName[index]);
  }, 1000);
  return <>{names}</>;
};

export default Name;
