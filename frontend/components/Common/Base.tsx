import {Flex, Box} from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';

const Base: React.FC<{children: React.ReactNode}> = props => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box>{props.children}</Box>
      <Box marginTop="auto" as="footer">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Base;
