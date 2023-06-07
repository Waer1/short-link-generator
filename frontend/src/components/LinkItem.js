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
  const [isOpened, setIisOpened] = useState(false);
  const [editedLink, setEditedLink] = useState(link);

  const handleDelete = () => {
    deleteLink(link.slug);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save the edited link
      editLink(editedLink);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedLink((prevLink) => ({
      ...prevLink,
      [name]: value,
    }));
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
        onClick={() => setIisOpened(!isOpened)}
      >
        <Typography
          variant='h5'
          sx={{ flexGrow: 1, color: "rgba(28,87,153,1)" }}
        >
          {editedLink.slug}
        </Typography>
        <IconButton
          size='large'
          sx={{ color: "rgba(28,87,153,1)" }}
          onClick={() => setIisOpened(!isOpened)}
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
                  name='iosPrimary'
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
                  name='iosFallback'
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
                  name='androidPrimary'
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
                  name='androidFallback'
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
