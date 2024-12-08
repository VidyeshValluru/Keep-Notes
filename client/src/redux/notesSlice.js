import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addNote = createAsyncThunk('notes/addNote', async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    updateNoteFromSocket: (state, action) => {
      const index = state.items.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter(note => note.id !== action.payload);
      });
  }
});

export const { updateNoteFromSocket } = notesSlice.actions;
export default notesSlice.reducer; 