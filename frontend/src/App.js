import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiUtils";
import LinkList from "./components/LinkList";
import AddLinkForm from "./components/AddLinkForm";
import { SnackbarProvider, useSnackbar } from "notistack";
import FullPageBackground from "./components/FullPageBackground";
import { Box, Paper } from "@mui/material";

const API_URL = "/shortlinks";

function App() {
  const [links, setLinks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchLinks(); // Fetching links on component mount
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(BASE_URL + API_URL);
      const { data } = response.data;
      setLinks(data.shortlinks);
      console.log(data.shortlinks);
      enqueueSnackbar("Links fetched successfully", { variant: "success" });
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error fetching links", { variant: "error" });
    }
  };

  const addLink = async (newLink) => {
    await axios
      .post(BASE_URL + API_URL, newLink)
      .then((response) => {
        enqueueSnackbar("Link added successfully", { variant: "success" });
        fetchLinks();
      })
      .catch((error) => {
        console.error("Error:", error);
        enqueueSnackbar("Error adding link", { variant: "error" });
      });
  };

  const deleteLink = async (slug) => {
    await axios
      .delete(`${BASE_URL + API_URL}/${slug}`)
      .then((response) => {
        enqueueSnackbar("Link deleted successfully", { variant: "success" });
        fetchLinks();
      })
      .catch((error) => {
        console.error("Error:", error);
        enqueueSnackbar("Error deleting link", { variant: "error" });
      });
  };

  const editLink = async (updatedFields, linkSlug) => {
    console.log(updatedFields, linkSlug);
    await axios
      .patch(`${BASE_URL + API_URL}/${linkSlug}`, updatedFields)
      .then((response) => {
        enqueueSnackbar("Link updated successfully", { variant: "success" });
        fetchLinks();
      })
      .catch((error) => {
        console.error("Error:", error);
        enqueueSnackbar("Error updating link", { variant: "error" });
      });
  };

  return (
    <SnackbarProvider maxSnack={5}>
      <FullPageBackground svgLocation='logo.svg'>
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
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <AddLinkForm addLink={addLink} svgLocation='logo.svg' />
          </Paper>
        </Box>
      </FullPageBackground>
    </SnackbarProvider>
  );
}

export default App;
