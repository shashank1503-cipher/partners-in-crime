import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Landing from './pages/Landing';
import '@fontsource/source-code-pro/700.css';
import '@fontsource/roboto/400.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signup2 from './pages/Signup2';
import Main from './pages/Main';
import Landing2 from './pages/Landing2';
import Messages from './pages/Messages';
function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/messages" element={<Messages/>}/>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} /> */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
