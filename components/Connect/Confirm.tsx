import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  UnorderedList,
  ListItem,
  Center,
} from '@chakra-ui/react';
import React from 'react';

const Confirm: React.FC<{isAvailable: boolean; permissionReq: () => void}> = ({
  isAvailable,
  permissionReq,
}) => {
  const confirmDialog = useDisclosure();
  const noAvailableDialog = useDisclosure();

  React.useEffect(() => {
    if (isAvailable) {
      confirmDialog.onOpen();
    } else {
      noAvailableDialog.onOpen();
    }
  }, [isAvailable]);

  return (
    <>
      <Modal isOpen={confirmDialog.isOpen} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>アクセスを許可してください</ModalHeader>
          <ModalBody>
            <Text>
              <Text as="span" fontWeight="bold">
                位置情報
              </Text>
              と
              <Text as="span" fontWeight="bold">
                動作と方向
              </Text>
              のアクセス権限が必要です。
            </Text>
            <Text mt=".5rem">収集した情報は以下の用途で使用されます。</Text>
            <UnorderedList mt="1rem">
              <ListItem>
                <Text as="span" fontWeight="bold">
                  位置情報
                </Text>
                : 相手との相対位置を算出するのに使用します。
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="bold">
                  動作と方向
                </Text>
                : 端末の向き（方位）を計算するのに使用します。
              </ListItem>
            </UnorderedList>
            <Center my="1rem">
              <Button
                colorScheme="pink"
                width={{base: '100%', md: 'auto'}}
                onClick={() => {
                  confirmDialog.onClose();
                  permissionReq();
                }}
              >
                アクセスを許可する
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={noAvailableDialog.isOpen}
        onClose={noAvailableDialog.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>この端末では利用できません</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="1rem">
            <Text>この端末では以下の理由により使用できません。</Text>
            <UnorderedList mt="1rem">
              <ListItem>端末の向きを取得できない</ListItem>
              <ListItem>位置情報が取得できない</ListItem>
              <ListItem>通信が暗号化されていない</ListItem>
              <ListItem>IDが指定されていない</ListItem>
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Confirm;
