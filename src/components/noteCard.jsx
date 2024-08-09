import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
const NoteCard = ({ data, onDelete }) => {
  return (
    <Card elevation={2}>
      <CardHeader
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
