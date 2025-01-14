import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Import the Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("to do list");
  const navigate = useNavigate();

  const navigateToNote = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    setTitleError(title === "");
    setDetailsError(details === "");

    if (title !== "" && details !== "") {
      try {
        // Add the note to Firestore
        const docRef = await addDoc(collection(db, "note"), {
          title,
          noteDetails: details,
          category,
        });

        console.log("Document written with ID: ", docRef.id);

        // Navigate to the notes page after successful addition
        navigateToNote();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const customStyle = {
    field: {
      marginTop: "20px",
      marginBottom: "10px",
      display: "block",
    },
    submitButton: {
      marginTop: "10px",
    },
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Note Title"
          fullWidth
          required
          error={titleError}
          onChange={(event) => setTitle(event.target.value)}
          sx={customStyle.field}
        />
        <TextField
          variant="outlined"
          label="Note Details"
          fullWidth
          required
          multiline
          error={detailsError}
          onChange={(event) => setDetails(event.target.value)}
          rows={5}
          sx={customStyle.field}
        />
        <FormControl sx={customStyle.field}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            defaultValue={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <FormControlLabel
              value="to do list"
              control={<Radio />}
              label="To Do List"
            />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel
              value="money"
              control={<Radio />}
              label="Money"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
          sx={customStyle.submitButton}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;
