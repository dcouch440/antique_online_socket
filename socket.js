const app = require('./app');
const socket = require('http').createServer(app);
const corsConfig = require('./config/cors.config');

const {
  userCameOnline,
  userWentOffline,
  getUserIdBySocketId
} = require('./src/online-state/actions');

const {
  CONNECTION,
  LOGIN,
  DISCONNECT,
} = require('./events');

const io = require('socket.io')( socket, {
  cors: corsConfig
});

io.on(CONNECTION, socket => {
  socket.emit(CONNECTION, 'online - connection');

  socket.on(LOGIN, async data => {
    try {
      socket.emit(LOGIN, 'online - login');
      const { id :user_id } = data;
      const { id :socket_id } = socket;
      data.id && console.log('a user ' + data.id + ' connected');
      data.id && await userCameOnline({ socket_id, user_id });
    } catch (err) {
      console.error(err);
    }
  });

  socket.on(DISCONNECT, async () => {
    try {
      const { id :socket_id } = socket;
      const user_id = getUserIdBySocketId({ socket_id });
      console.log('user ' + user_id + ' disconnected');
      user_id && await userWentOffline({ socket_id, user_id });
    } catch (err) {
      console.error(err);
    }
  });
});

module.exports = socket;