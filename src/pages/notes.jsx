import React, { useEffect, useState } from "react";
import NoteCard from "../components/noteCard";
import Masonry from "react-masonry-css";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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
      setLoading(false);  // Set loading to false once data is fetched
      console.log(notesData);
    } catch (error) {
      setError(error.message);
      setLoading(false);  // Set loading to false even on error
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
    <>
      {error && <p>Error: {error}</p>}
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <NoteCard key={note.id} data={note} onDelete={handleDelete} />
        ))}
      </Masonry>
    </>
  );
};

export default Notes;
