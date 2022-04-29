import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';

const MyApp = ({Component, pageProps}: AppProps) => (
  <RecoilRoot>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </RecoilRoot>
);

export default MyApp;
