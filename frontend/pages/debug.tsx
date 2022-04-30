import {Switch, FormControl, FormLabel, Button} from '@chakra-ui/react';
import Link from 'next/link';
import {useRecoilState} from 'recoil';
import {DebugModeState} from '../utils/atom';

const Debug = () => {
  const [debugMode, setDebugMode] = useRecoilState(DebugModeState);
  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="debug-mode" mb="0">
          デバッグモード
        </FormLabel>
        <Switch
          id="debug-mode"
          isChecked={debugMode}
          onChange={e => setDebugMode(e.target.checked)}
        />
      </FormControl>
      <Link href="/" passHref>
        <Button>戻る</Button>
      </Link>
    </>
  );
};

export default Debug;
