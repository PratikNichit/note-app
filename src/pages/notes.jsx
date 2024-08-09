import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

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

  return (
    <Container>
      {error && <p>Error: {error}</p>}
      <Grid container>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <Paper>{note.title}</Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
