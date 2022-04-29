import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';
import Base from '../components/Common/Base';

const MyApp = ({Component, pageProps}: AppProps) => (
  <RecoilRoot>
    <ChakraProvider>
      <Base>
        <Component {...pageProps} />
      </Base>
    </ChakraProvider>
  </RecoilRoot>
);

export default MyApp;
