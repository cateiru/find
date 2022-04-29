import React from 'react';
import type {DeviceOrientationEventWebkit} from '../../types/webkit';
import {compassHeading} from '../../utils/calc';
import {getOS} from '../../utils/os';

declare const DeviceOrientationEvent: DeviceOrientationEventWebkit;

const useDirection = (): [boolean, number, () => void] => {
  const [isAvailable, setAvailable] = React.useState(true);
  const [os, setOS] = React.useState('');
  const [degrees, setDegrees] = React.useState(0);

  React.useEffect(() => {
    const thisDeviceOS = getOS();
    setOS(thisDeviceOS);

    console.log(thisDeviceOS);

    if (thisDeviceOS === 'pc') {
      setAvailable(false);
    }
  }, []);

  const orientationEvent = (e: DeviceOrientationEvent) => {
    const alpha = e.alpha || 0;
    const beta = e.beta || 0;
    const gamma = e.gamma || 0;

    if (os === 'iphone') {
      // webkitCompasssHeading値を採用
      // https://developer.apple.com/documentation/webkitjs/deviceorientationevent/1804777-webkitcompassheading
      setDegrees((e as DeviceOrientationEventWebkit).webkitCompassHeading);
    } else {
      // deviceorientationabsoluteイベントのalphaを補正
      setDegrees(compassHeading(alpha, beta, gamma));
    }
  };

  const permissionReq = () => {
    if (os === 'iphone') {
      // iPhoneのみ動作する
      // TODO: 型がないのでちゃんとしたい
      DeviceOrientationEvent.requestPermission().then((response: string) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', orientationEvent);
        }
      });
    } else if (os === 'android') {
      window.addEventListener(
        'deviceorientation', // ?> deviceorientationabsolute
        orientationEvent,
        true
      );
    }
  };

  return [isAvailable, degrees, permissionReq];
};

export default useDirection;
