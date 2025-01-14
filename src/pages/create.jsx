import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("to do list");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigateToNote = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    const trimmedTitle = title.trim();
    const trimmedDetails = details.trim();

    if (trimmedTitle === "") {
      setTitleError(true);
    }
    if (trimmedDetails === "") {
      setDetailsError(true);
    }

    if (trimmedTitle && trimmedDetails) {
      try {
        await addDoc(collection(db, "notes"), {
          title: trimmedTitle,
          details: trimmedDetails,
          category,
          createdAt: new Date().toISOString(), // Add timestamp for better tracking
        });
        navigateToNote();
      } catch (error) {
        console.error("Error adding document: ", error.message);
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
    <Box maxWidth={isMobile ? "sm" : "md"} sx={{display: "flex", flexDirection: "column", margin: "auto"}}>
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
          helperText={titleError ? "Title cannot be empty" : ""}
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          sx={customStyle.field}
        />
        <TextField
          variant="outlined"
          label="Note Details"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          helperText={detailsError ? "Details cannot be empty" : ""}
          onChange={(event) => setDetails(event.target.value)}
          value={details}
          sx={customStyle.field}
        />
        <FormControl sx={customStyle.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
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
              value="work"
              control={<Radio />}
              label="Work"
            />
            <FormControlLabel
              value="personal"
              control={<Radio />}
              label="Personal"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          sx={customStyle.submitButton}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Create;
