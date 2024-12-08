import React from "react";
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/notesSlice';
import DeleteIcon from "@material-ui/icons/Delete";

function Note({ id, title, content }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteNote(id));
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
