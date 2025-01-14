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
  const applyBackgroundColor = (category) => {
    const categoryColors = {
      work: yellow[700],
      money: green[500],
      todos: pink[500],
    };

    return categoryColors[category] || blue[500];
  };

  const safeCategory = data.category || "Uncategorized"; // Fallback if category is missing

  return (
    <Card elevation={2}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: applyBackgroundColor(safeCategory) }}>
            {safeCategory[0].toUpperCase()} {/* Ensure safeCategory is not undefined */}
          </Avatar>
        }
        action={
          <IconButton onClick={() => onDelete(data.id)}>
            <Delete />
          </IconButton>
        }
        title={data.title || "Untitled"} 
        subheader={safeCategory}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          {data.noteDetails || "No details available"} {/* Use noteDetails */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;

