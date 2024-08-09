import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/noteCard";
import Masonry from "react-masonry-css";

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
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard data={note} onDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </>
  );
};

export default Notes;
