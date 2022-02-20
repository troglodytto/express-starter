import { Server } from 'socket.io';

const socketServer = new Server({
  cors: {
    origin: '*',
    optionsSuccessStatus: 200,
  },
});

export default socketServer;
