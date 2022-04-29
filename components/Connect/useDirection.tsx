import React from 'react';
import {compassHeading} from '../../utils/calc';
import {getOS} from '../../utils/os';

const useDirection = (): [boolean, number, () => void] => {
  const [isAvailable, setAvailable] = React.useState(true);
  const [os, setOS] = React.useState(getOS());
  const [degrees, setDegrees] = React.useState(0);

  React.useEffect(() => {
    console.log(os)
    if(os === 'pc') {
      setAvailable(false)
    }
  }, []);

  const orientationEvent = React.useCallback((e: DeviceOrientationEvent) => {
    const alpha = e.alpha || 0;
    const beta = e.beta || 0;
    const gamma = e.gamma || 0;

    if (os === 'iphone') {
      // webkitCompasssHeading値を採用
      setDegrees((e as any).webkitCompassHeading);
    } else {
      // deviceorientationabsoluteイベントのalphaを補正
      setDegrees(compassHeading(alpha, beta, gamma))
    }

  }, []);

  const permissionReq = () => {
    if(os === 'iphone') {
      ((DeviceOrientationEvent as any).requestPermission())
                    .then((response: string) => {
                        if (response === "granted") {
                            window.addEventListener(
                                "deviceorientation",
                                orientationEvent
                            );
                        }
                    })
                    .catch(console.error);
    } else if (os == "android") {
      window.addEventListener(
          "deviceorientation", // ?> deviceorientationabsolute
          orientationEvent,
          true
      );
    } else {}
  };

  return [isAvailable, degrees, permissionReq];
};

export default useDirection;
