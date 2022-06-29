import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Landing from './pages/Landing';
import '@fontsource/source-code-pro/700.css';
import '@fontsource/roboto/400.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signup2 from './pages/Signup2';
import Main from './pages/Main';
function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} /> */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
