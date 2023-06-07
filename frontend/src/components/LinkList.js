import React from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import LinkItem from "./LinkItem";

function LinkList({ links, deleteLink, editLink }) {
  return (
    <Box>
      <Typography variant='h4'>
        <span style={{ color: "rgba(28,87,153,1)" }}>Links </span>
        <span style={{ color: "rgba(223,102,135,1)" }}>List</span>
      </Typography>
      {links.length === 0 ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='200px' // Adjust the height as needed
        >
          <Typography sx={{ color: "rgba(28,87,153,1)" }} variant='h4'>No links to show</Typography>
        </Box>
      ) : (
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
      )}
    </Box>
  );
}

export default LinkList;
