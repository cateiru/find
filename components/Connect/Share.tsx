import {
  Box,
  Input,
  Text,
  useClipboard,
  InputRightElement,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import {IoCopy, IoCheckmark} from 'react-icons/io5';

const Share: React.FC<{id: string}> = ({id}) => {
  const clipboardId = useClipboard(id);
  const clipboardURL = useClipboard(
    `https://find.cateiru.com/connect?id=${id}`
  );

  return (
    <Box mt="3rem" width={{base: '90vw', md: '400px'}}>
      <InputGroup>
        <Input value={id} onChange={() => {}} />
        <InputRightElement>
          <IconButton
            aria-label="copy id"
            onClick={clipboardId.onCopy}
            icon={
              clipboardId.hasCopied ? (
                <IoCheckmark size="30px" color="#48BB78" />
              ) : (
                <IoCopy size="20px" />
              )
            }
            variant="ghost"
            size="sm"
          />
        </InputRightElement>
      </InputGroup>

      <Text textAlign="center" my=".5rem">
        または、
      </Text>
      <InputGroup>
        <Input
          value={`https://find.cateiru.com/connect?id=${id}`}
          onChange={() => {}}
        />
        <InputRightElement>
          <IconButton
            aria-label="copy url"
            onClick={clipboardURL.onCopy}
            icon={
              clipboardURL.hasCopied ? (
                <IoCheckmark size="30px" color="#48BB78" />
              ) : (
                <IoCopy size="20px" />
              )
            }
            variant="ghost"
            size="sm"
          />
        </InputRightElement>
      </InputGroup>

      <Text textAlign="center" mt=".5rem">
        を、相手に送信してください。
      </Text>
    </Box>
  );
};

export default Share;
