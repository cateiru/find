import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import React from 'react';
import {RecoilRoot} from 'recoil';
import Base from '../components/Common/Base';
import {pageview, GA_TRACKING_ID} from '../utils/gtag';

const MyApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <ChakraProvider>
        <Base>
          <Component {...pageProps} />
        </Base>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default MyApp;
