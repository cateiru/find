import {
  Center,
  Box,
  Heading,
  Input,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';

const Home = () => {
  const [id, setId] = React.useState('');
  const [err, setErr] = React.useState(false);
  const router = useRouter();

  const handleChange = () => {
    if (/[0-9A-Z]{10}/.test(id)) {
      router.push(`/connect?id=${encodeURI(id)}`);
    } else {
      setErr(true);
    }
  };

  const handleNew = () => {
    let key = '';
    for (let i = 0; i < 15; i++) {
      key += Math.floor(Math.random() * 16).toString(16);
    }

    const newId = key.toUpperCase();

    router.push(`/connect?id=${encodeURI(newId)}&new`);
  };

  return (
    <Center height="92vh">
      <Box>
        <Heading textAlign="center" mb="1rem">
          ふぁいんど！
        </Heading>
        <Box
          borderWidth={{base: '0', md: '2px'}}
          borderRadius="10px"
          width={{base: '100vw', md: '600px'}}
          height={{base: 'auto', md: '400px'}}
        >
          <Flex alignItems="center" height="100%">
            <Box width="100%">
              <Center>
                <Input
                  size="md"
                  width="95%"
                  colorScheme="pink"
                  placeholder="XXXXXXXXXX"
                  value={id}
                  isInvalid={err}
                  onChange={e => {
                    setId(e.target.value);
                    setErr(false);
                  }}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleChange();
                    }
                  }}
                />
              </Center>
              <Text textAlign="center" my="1rem" fontWeight="bold">
                または、
              </Text>
              <Center>
                <Button
                  colorScheme="pink"
                  width={{base: '95%', md: 'auto'}}
                  onClick={handleNew}
                >
                  待ち合わせを作成
                </Button>
              </Center>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Center>
  );
};

export default Home;
