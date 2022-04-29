import {Center, Divider, Box, Text, Link} from '@chakra-ui/react';

const Footer = () => {
  return (
    <>
      <Center>
        <Box width="95%" margin="1rem 0 1rem 0">
          <Divider />
        </Box>
      </Center>
      <Text textAlign="center" mb="1.5rem">
        &copy; {new Date().getFullYear()}&nbsp;
        <Link href="https://cateiru.com" isExternal>
          cateiru
        </Link>
      </Text>
    </>
  );
};

export default Footer;
