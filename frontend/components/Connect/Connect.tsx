import {Center, Heading, Box} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {calcDirec, calcPosition} from '../../utils/calc';
import Compass from './Compass';
import Confirm from './Confirm';
import Share from './Share';
import useDirection from './useDirection';
import useGeolocation from './useGeolocation';
import useSocket from './useSocket';

const Connect = React.memo(() => {
  const [id, setId] = React.useState('');
  const [isNew, setIsNew] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [isAvailableGeolocation, position, getCurrentPosition] =
    useGeolocation();
  const [isAvailableDirection, degrees, permissionReq] = useDirection();
  const [partnerPosition, send, connect] = useSocket();

  const [distance, setDistance] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;

    if (typeof query['id'] === 'string') {
      const queryId = query['id'];
      if (/[0-9A-Z]{10}/.test(queryId)) {
        setIsAvailable(true);
        setId(query['id']);
        connect(query['id']);
      }
    }
    if (typeof query['new'] !== 'undefined') {
      setIsNew(true);
    }
  }, [router.isReady, router.query]);

  // 1秒おきに位置情報を取得するやつ
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (id.length !== 0 && isAvailableGeolocation) {
      interval = setInterval(() => {
        console.log('get location');
        getCurrentPosition();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [id, isAvailableGeolocation]);

  React.useEffect(() => {
    send(position);
  }, [position]);

  // 2点の緯度経度から距離を求めるやつ
  React.useEffect(() => {
    if (
      partnerPosition.lat !== 0 &&
      partnerPosition.lon !== 0 &&
      position.lat !== 0 &&
      position.lon !== 0
    ) {
      let distance = calcPosition(position, partnerPosition);
      // 値が負になるとNaNになるため0にする
      if (isNaN(distance)) {
        distance = 0;
      }
      setDistance(Math.floor(distance));

      const d = calcDirec(position, partnerPosition);
      setDirection(d);
    }
  }, [position, partnerPosition]);

  return (
    <>
      <Confirm
        isAvailable={
          isAvailableGeolocation && isAvailableDirection && isAvailable
        }
        permissionReq={permissionReq}
      />
      {JSON.stringify(position)}
      <br />
      {JSON.stringify(partnerPosition)}
      <br />
      {JSON.stringify(degrees)}
      <br />
      {direction}
      <Center height="95vh">
        <Box>
          <Center>
            <Compass degrees={(degrees + direction) % 360} />
          </Center>

          <Heading textAlign="center">あと、{distance}m</Heading>
          {isNew && <Share id={id} />}
        </Box>
      </Center>
    </>
  );
});

Connect.displayName = 'connect';

export default Connect;
