import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { RiRestartLine } from "react-icons/ri";
import { useSnackbar } from "notistack";

function AddLinkForm({ addLink, svgLocation }) {
  const [slug, setSlug] = useState("");
  const [ios, setIos] = useState({ primary: "", fallback: "" });
  const [android, setAndroid] = useState({ primary: "", fallback: "" });
  const [web, setWeb] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const generateRandomSlug = () => {
    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 9) + 8; // Random length between 8 and 16
    let randomSlug = "";
    for (let i = 0; i < length; i++) {
      randomSlug += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return randomSlug;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!web) {
      enqueueSnackbar("Web URL is required", { variant: "error" });
      return;
    }

    if (!android.primary) {
      enqueueSnackbar("Android Primary URL is required", { variant: "error" });
      return;
    }

    if (!android.fallback) {
      enqueueSnackbar("Android Fallback URL is required", { variant: "error" });
      return;
    }

    if (!ios.primary) {
      enqueueSnackbar("iOS Primary URL is required", { variant: "error" });
      return;
    }

    if (!ios.fallback) {
      enqueueSnackbar("iOS Fallback URL is required", { variant: "error" });
      return;
    }

    const newLink = {
      slug: slug || generateRandomSlug(),
      ios,
      android,
      web,
    };
    addLink(newLink);
    setSlug("");
    setIos({ primary: "", fallback: "" });
    setAndroid({ primary: "", fallback: "" });
    setWeb("");
  };

  return (
    <Grid
      component={"form"}
      onSubmit={handleSubmit}
      item
      container
      xs={12}
      md={12}
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ height: "100%" }}
    >
      <Grid item xs={12} justifyContent="center" textAlign="center">
        <img
          src={svgLocation}
          alt="Logo"
          style={{ width: "200px", height: "auto" }}
        />
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        columnSpacing={1}
        rowSpacing={2}
      >
        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
          <TextField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <Button onClick={generateRandomSlug} style={{ minWidth: 0 }}>
                  <RiRestartLine size={20} />
                </Button>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ flexGrow: 2 }}>
          <TextField
            label="Web URL"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
          <TextField
            label="Android Primary URL"
            value={android.primary}
            onChange={(e) =>
              setAndroid({ ...android, primary: e.target.value })
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ flexGrow: 2 }}>
          <TextField
            label="Android Fallback URL"
            value={android.fallback}
            onChange={(e) =>
              setAndroid({ ...android, fallback: e.target.value })
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
          <TextField
            label="iOS Primary URL"
            value={ios.primary}
            onChange={(e) => setIos({ ...ios, primary: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ flexGrow: 2 }}>
          <TextField
            label="iOS Fallback URL"
            value={ios.fallback}
            onChange={(e) => setIos({ ...ios, fallback: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Box mt={0} textAlign="start">
        <Button type="submit" variant="contained" color="primary" size="large">
          Add
        </Button>
      </Box>
    </Grid>
  );
}

export default AddLinkForm;
