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

const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("to do list");
  const nagivate = useNavigate();

  const nagitaveToNote = () => {
    nagivate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    title === "" ? setTitleError(true) : setTitleError(false);
    details === "" ? setDetailsError(true) : setDetailsError(false);

    if (title !== "" && details !== "")
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(nagitaveToNote());
  };

  const customeStyle = {
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
    <>
      <Container>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Create a New Note
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            label="Note Title"
            fullWidth
            required
            error={titleError}
            onChange={(event) => setTitle(event.target.value)}
            sx={customeStyle.field}
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
            sx={customeStyle.field}
          />

          <FormControl sx={customeStyle.field}>
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
            sx={customeStyle.submitButton}
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Create;
