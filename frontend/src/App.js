import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiUtils";
import LinkList from "./components/LinkList";
import AddLinkForm from "./components/AddLinkForm";
import { SnackbarProvider, useSnackbar } from "notistack";
import FullPageBackground from "./components/FullPageBackground";
import { Box, Paper, Container } from "@mui/material";

const dummyData = [
  {
    id: 1,
    slug: "example-1",
    ios: {
      primary: "https://www.example.com/ios1",
      fallback: "https://www.example.com/fallback1",
    },
    android: {
      primary: "https://www.example.com/android1",
      fallback: "https://www.example.com/fallback1",
    },
    web: "https://www.example.com/web1",
  },
  {
    id: 2,
    slug: "example-2",
    ios: {
      primary: "https://www.example.com/ios2",
      fallback: "https://www.example.com/fallback2",
    },
    android: {
      primary: "https://www.example.com/android2",
      fallback: "https://www.example.com/fallback2",
    },
    web: "https://www.example.com/web2",
  },
];

function App() {
  dummyData.push(...dummyData)
  const [links, setLinks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchLinks(); // Fetching links on component mount
  }, []);

  const fetchLinks = async () => {
    // Sample data for testing
    setLinks(dummyData);
    enqueueSnackbar("Links fetched successfully", { variant: "success" });
  };

  const addLink = async (newLink) => {
    try {
      // Add your API logic here
      enqueueSnackbar("Link added successfully", { variant: "success" });
      fetchLinks(); // Fetch links after adding a new link
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error adding link", { variant: "error" });
    }
  };

  const deleteLink = async (slug) => {
    try {
      // Add your API logic here
      enqueueSnackbar("Link deleted successfully", { variant: "success" });
      fetchLinks(); // Fetch links after deleting a link
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error deleting link", { variant: "error" });
    }
  };

  const editLink = async (updatedLink) => {
    try {
      // Add your API logic here
      enqueueSnackbar("Link updated successfully", { variant: "success" });
      fetchLinks(); // Fetch links after updating a link
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error updating link", { variant: "error" });
    }
  };

  return (
    <SnackbarProvider maxSnack={5}>
      <FullPageBackground svgLocation="logo.svg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70vh",
            gap: "2rem",
            width: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "50%",
              padding: "2rem",
              backgroundColor: "#fafafa",
              borderRadius: "1rem",
              overflowY: "scroll",
            }}
          >
            <LinkList
              links={links}
              deleteLink={deleteLink}
              editLink={editLink}
            />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              width: "25%",
              padding: "2rem",
              backgroundColor: "#fafafa",
              borderRadius: "1rem",
            }}
          >
            <AddLinkForm addLink={addLink} svgLocation="logo.svg" />
          </Paper>
        </Box>
      </FullPageBackground>
    </SnackbarProvider>
  );
}

export default App;
