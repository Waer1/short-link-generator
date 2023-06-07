import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Grid,
  Typography,
  Box,
  Collapse,
  Paper,
} from "@mui/material";
import {
  Delete,
  Edit,
  Save,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

function LinkItem({ link, deleteLink, editLink }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [editedLink, setEditedLink] = useState(link);

  const handleDelete = () => {
    deleteLink(link.slug);
  };

  const handleEdit = async () => {
    if (isEditing) {
      const updatedFields = {};

      // Check if each field has changed and add it to the updatedFields object
      if (editedLink.ios.primary !== link.ios.primary) {
        updatedFields.ios = { ...link.ios, primary: editedLink.ios.primary };
      }
      if (editedLink.ios.fallback !== link.ios.fallback) {
        updatedFields.ios = { ...link.ios, fallback: editedLink.ios.fallback };
      }
      if (editedLink.android.primary !== link.android.primary) {
        updatedFields.android = {
          ...link.android,
          primary: editedLink.android.primary,
        };
      }
      if (editedLink.android.fallback !== link.android.fallback) {
        updatedFields.android = {
          ...link.android,
          fallback: editedLink.android.fallback,
        };
      }
      if (editedLink.web !== link.web) {
        updatedFields.web = editedLink.web;
      }

      // Only call the API if there are updated fields
      if (Object.keys(updatedFields).length > 0) {
        await editLink(updatedFields, link.slug); // Pass link.slug as an argument
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(editedLink, name, value);

    if (name.includes(".")) {
      const [beforeDot, afterDot] = name.split(".");
      setEditedLink((prevLink) => ({
        ...prevLink,
        [beforeDot]: {
          ...prevLink[beforeDot],
          [afterDot]: value,
        },
      }));
    } else {
      setEditedLink((prevLink) =>   ({
        ...prevLink,
        [name]: value,
      }));
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "60px", // Increase the height
          paddingLeft: "16px", // Add left padding
          cursor: "pointer",
        }}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Typography
          variant='h5'
          sx={{ flexGrow: 1, color: "rgba(28,87,153,1)" }}
        >
          Slug: {editedLink.slug}
        </Typography>
        <IconButton
          size='large'
          sx={{ color: "rgba(28,87,153,1)" }}
          onClick={() => setIsOpened(!isOpened)}
        >
          {isOpened ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={isOpened}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
            marginTop: "1rem", // Increase the top margin for spacing
            marginLeft: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem", // Increase the bottom margin for spacing
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  name='slug'
                  label='Slug'
                  value={editedLink.slug}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='ios.primary'
                  label='iOS Primary'
                  value={editedLink.ios.primary}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='ios.fallback'
                  label='iOS Fallback'
                  value={editedLink.ios.fallback}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={3} textAlign='center'>
                {isEditing ? (
                  <IconButton
                    sx={{ color: "rgba(28,87,153,1)" }}
                    onClick={handleEdit}
                  >
                    <Save />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ color: "rgba(28,87,153,1)" }}
                    onClick={handleEdit}
                  >
                    <Edit />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  name='android.primary'
                  label='Android Primary'
                  value={editedLink.android.primary}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='android.fallback'
                  label='Android Fallback'
                  value={editedLink.android.fallback}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='web'
                  label='Web'
                  value={editedLink.web}
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={3} textAlign='center'>
                <IconButton sx={{ color: "red" }} onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default LinkItem;
