import http from 'http';
import express from 'express';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://find.cateiru.com', 'http://192.168.3.253:3000'],
  },
});

app.get('/', (req, res) => {
  res.send('hello');
});

io.on('connection', socket => {
  let room = '';

  socket.on('join_room', data => {
    room = data.id;
    socket.join(room);
  });

  socket.on('client2server', data => {
    io.to(room).emit('server2client', {lat: data.lat, lon: data.lon});
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
