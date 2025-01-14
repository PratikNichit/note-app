import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  CardActions,
  Tooltip,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { blue, green, pink, yellow, grey } from "@mui/material/colors";

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
    <Card
      elevation={4}
      sx={{
        borderRadius: 2,
        backgroundColor: grey[50],
        ":hover": {
          boxShadow: 6, // Add hover effect for better interactivity
        },
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: applyBackgroundColor(safeCategory),
              color: "white",
            }}
          >
            {safeCategory[0].toUpperCase()} {/* Ensure safeCategory is not undefined */}
          </Avatar>
        }
        action={
          <Tooltip title="Delete Note" arrow>
            <IconButton
              onClick={() => onDelete(data.id)}
              sx={{
                ":hover": {
                  color: grey[700],
                },
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        }
        title={
          <Typography variant="h6" component="div" noWrap>
            {data.title || "Untitled"} {/* Fallback if title is missing */}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textSecondary" noWrap>
            {safeCategory}
          </Typography>
        }
      />

      {/* Content */}
      <CardContent>
        <Typography
          variant="body2"
          color="textPrimary"
          sx={{
            whiteSpace: "pre-line", // Handle multi-line content gracefully
            wordBreak: "break-word",
          }}
        >
          {data.noteDetails || "No details available"} {/* Fallback for details */}
        </Typography>
      </CardContent>

      {/* Footer */}
      <CardActions disableSpacing sx={{ justifyContent: "flex-end", px: 2 }}>
        <Box>
          <Typography variant="caption" color="textSecondary">
            Category: <strong>{safeCategory}</strong>
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
