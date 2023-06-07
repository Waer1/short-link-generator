import React from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import LinkItem from "./LinkItem";

function LinkList({ links, deleteLink, editLink }) {
  return (
    <Box>
      <Typography variant="h4">
        <span style={{ color: "rgba(28,87,153,1)" }}>Links </span>
        <span style={{ color: "rgba(223,102,135,1)" }}>List</span>
      </Typography>
      <List>
        {links.map((link) => (
          <ListItem key={link.slug}>
            <LinkItem
              link={link}
              deleteLink={deleteLink}
              editLink={editLink}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LinkList;
