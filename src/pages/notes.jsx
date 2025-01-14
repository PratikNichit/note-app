import React, { useEffect, useState } from "react";
import NoteCard from "../components/noteCard";
import Masonry from "react-masonry-css";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { CircularProgress, Typography, Box } from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "note"));
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title, // Access title field
          noteDetails: doc.data().noteDetails, // Access noteDetails field
          category: doc.data().category, // Access category field
        }));
        setNotes(notesData);
      } catch (error) {
        setError("Failed to load notes. Please try again.");
      } finally {
        setLoading(false); // Ensure loading is turned off
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
    } catch (error) {
      setError("Failed to delete note");
    }
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Box>
      {/* Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : notes.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
          No notes found.
        </Typography>
      ) : (
        <Masonry
          breakpointCols={breakPoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note) => (
            <NoteCard key={note.id} data={note} onDelete={handleDelete} />
          ))}
        </Masonry>
      )}
    </Box>
  );
};

export default Notes;
