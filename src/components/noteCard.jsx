import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { blue, green, pink, yellow } from "@mui/material/colors";
const NoteCard = ({ data, onDelete }) => {
  const applyBackgroundColor = (data) => {
    if (data.category === "work") {
      return yellow[700];
    }
    if (data.category === "money") {
      return green[500];
    }
    if (data.category === "todos") {
      return pink[500];
    }

    return blue[500];
  };

  return (
    <Card elevation={2}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: applyBackgroundColor(data) }}>
            {data.category[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton onClick={() => onDelete(data.id)}>
            <Delete />
          </IconButton>
        }
        title={data.title}
        subheader={data.category}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          {data.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
