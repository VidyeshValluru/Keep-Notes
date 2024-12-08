import io from 'socket.io-client';
import { updateNoteFromSocket } from '../redux/notesSlice';

const SOCKET_URL = 'http://localhost:5000';

class WebSocketService {
  constructor(store) {
    this.socket = io(SOCKET_URL);
    this.store = store;
    this.setupListeners();
  }

  setupListeners() {
    this.socket.on('noteUpdated', (note) => {
      this.store.dispatch(updateNoteFromSocket(note));
    });
  }

  emitNoteUpdate(note) {
    this.socket.emit('noteUpdate', note);
  }
}

export default WebSocketService; 