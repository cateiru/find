import {Box, Flex} from '@chakra-ui/react';
import React from 'react';
import {IoMdNavigate} from 'react-icons/io';

const Compass: React.FC<{degrees: number}> = ({degrees}) => {
  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `rotate(${Math.floor(
        360 - degrees
      )}deg)`;
    }
  }, [degrees]);

  return (
    <Flex>
      <Box ref={canvasRef}>
        <IoMdNavigate size="260px" />
      </Box>
    </Flex>
  );
};

export default Compass;
