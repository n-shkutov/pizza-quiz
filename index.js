import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'src/theme';
import App from 'src/App';
import './index.css';

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>, document.getElementById('root'),
);
