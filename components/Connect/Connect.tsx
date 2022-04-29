import {useRouter} from 'next/router';
import React from 'react';
import Confirm from './Confirm';
import useDirection from './useDirection';
import useGeolocation from './useGeolocation';

const Connect = React.memo(() => {
  const [id, setId] = React.useState('');
  const [isNew, setIsNew] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [isAvailableGeolocation, position, getCurrentPosition] =
    useGeolocation();
  const [isAvailableDirection, degrees, permissionReq] = useDirection();

  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;

    if (typeof query['id'] === 'string') {
      const queryId = query['id'];
      if (/[0-9A-Z]{10}/.test(queryId)) {
        setIsAvailable(true);
        setId(query['id']);
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
      {JSON.stringify(degrees)}
    </>
  );
});

Connect.displayName = 'connect';

export default Connect;
