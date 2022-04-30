import {io, Socket} from 'socket.io-client';

const API_ENDPOINT = 'wss://api.find.cateiru.com';

export interface Position {
  lat: number;
  lon: number;
}

export class ConnectSocket {
  private socket: Socket;

  constructor() {
    this.socket = io(API_ENDPOINT, {
      withCredentials: true,
    });
  }

  public connect(id: string) {
    console.log(id);
    this.socket.on('connect', () => {
      this.join(id);
      console.log(this.socket.connected);
    });
  }

  private join(id: string) {
    this.socket.emit('join_room', {id: id});
  }

  public receive(resp: (data: Position) => void) {
    this.socket.on('server2client', msg => {
      resp(msg);
    });
  }

  public send(data: Position) {
    this.socket.emit('client2server', data);
  }

  public close() {
    this.socket.on('disconnect', () => {
      console.log(this.socket.connected);
    });
  }
}
