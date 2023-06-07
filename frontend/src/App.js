import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiUtils";
import LinkList from "./components/LinkList";
import AddLinkForm from "./components/AddLinkForm";
import { useSnackbar } from "notistack";

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
      enqueueSnackbar(error.response.data.message, { variant: "error" });
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
        enqueueSnackbar(error.response.data.message, { variant: "error" });
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
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  const editLink = async (updatedFields, linkSlug) => {
    await axios
      .patch(`${BASE_URL + API_URL}/${linkSlug}`, updatedFields)
      .then((response) => {
        enqueueSnackbar("Link updated successfully", { variant: "success" });
        fetchLinks();
      })
      .catch((error) => {
        console.error("Error:", error.response.data.message);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  return (
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
          <LinkList links={links} deleteLink={deleteLink} editLink={editLink} />
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
  );
}

export default App;
