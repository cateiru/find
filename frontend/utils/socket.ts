import {io, Socket} from 'socket.io-client';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

export interface Position {
  lat: number;
  lon: number;
}

export class ConnectSocket {
  private socket: Socket;

  constructor() {
    this.socket = io(API_ENDPOINT);
  }

  public connect() {
    this.socket.on('connect', () => {
      console.log(this.socket.connected);
    });
  }

  public join(id: string) {
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
