import React from 'react';
import type {Position} from '../../utils/socket';

const useGeolocation = (): [boolean, Position, () => void] => {
  const [isAvailable, setAvailable] = React.useState(false);
  const [position, setPosition] = React.useState<Position>({
    lat: 0,
    lon: 0,
  });

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);
      getCurrentPosition();
    }
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPosition({lat: latitude, lon: longitude});
      },
      err => {
        // TODO: err.codeで分けたい
        setAvailable(false);
      }
    );
  };

  return [isAvailable, position, getCurrentPosition];
};

export default useGeolocation;
