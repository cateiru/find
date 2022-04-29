import React from 'react';

const useGeolocation = (): [
  boolean,
  {latitude: number; longitude: number},
  () => void
] => {
  const [isAvailable, setAvailable] = React.useState(false);
  const [position, setPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);
      getCurrentPosition();
    }
  }, [isAvailable]);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setPosition({latitude, longitude});
    });
  };

  return [isAvailable, position, getCurrentPosition];
};

export default useGeolocation;
