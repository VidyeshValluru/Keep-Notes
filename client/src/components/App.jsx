import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../redux/notesSlice';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.items);
  const status = useSelector(state => state.notes.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  return (
    <div>
      <Header />
      <CreateArea />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
