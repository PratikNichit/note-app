import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/noteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setNotes(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleDelete = async (id) => {
    console.log("card ", id);
    const response = await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard data={note} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Notes;
