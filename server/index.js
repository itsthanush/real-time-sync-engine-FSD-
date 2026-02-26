const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { handleEvents } = require('./eventHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('../client'));

// Store events per room
let roomStates = {};

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Client sends their username and which room they want to join
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);                  // Socket.IO puts this socket into the named room
    socket.username = username;         // Save username on the socket object
    socket.currentRoom = room;          // Save which room they're in

    // Create room history if it doesn't exist yet
    if (!roomStates[room]) {
      roomStates[room] = { events: [] };
    }

    console.log(`👤 ${username} joined room: ${room}`);

    // Send this new user all past messages from this room
    socket.emit('sync', roomStates[room]);

    // Notify everyone else in the room that someone joined
    socket.to(room).emit('userJoined', { username });
  });

  socket.on('newEvent', (event) => {
    const room = socket.currentRoom;
    if (!room) return;

    handleEvents(event, roomStates[room]);

    // Emit to EVERYONE in the room including the sender
    // This way all users (including sender) use the same code path
    io.to(room).emit('eventReceived', event);
  });

  socket.on('disconnect', () => {
    console.log(`❌ ${socket.username} disconnected`);
    if (socket.currentRoom) {
      socket.to(socket.currentRoom).emit('userLeft', { username: socket.username });
    }
  });
});

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});