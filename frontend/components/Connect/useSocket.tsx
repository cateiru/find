import React from 'react';
import {Position, ConnectSocket} from '../../utils/socket';

const useSocket = (): [
  Position,
  (data: Position) => void,
  (id: string) => void
] => {
  const [partnerPosition, setPartnerPosition] = React.useState<Position>({
    lat: 0,
    lon: 0,
  });
  const socketRef = React.useRef<ConnectSocket>();

  React.useEffect(() => {
    const s = new ConnectSocket();
    socketRef.current = s;
  }, []);

  const connect = (id: string) => {
    if (socketRef.current) {
      socketRef.current.connect(id);

      socketRef.current.receive(data => {
        setPartnerPosition(data);
      });
    }
  };

  const send = (data: Position) => {
    if (socketRef.current) {
      socketRef.current.send(data);
    }
  };

  return [partnerPosition, send, connect];
};

export default useSocket;
