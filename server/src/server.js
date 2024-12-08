const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const notesRouter = require('./routes/notes');
const db = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/notes', notesRouter);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('noteUpdate', (data) => {
    socket.broadcast.emit('noteUpdated', data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 