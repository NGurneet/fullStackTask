import React from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Home, LibraryMusic, PlaylistPlay, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/home" },
    { text: "Songs", icon: <LibraryMusic />, path: "/songs" },
    { text: "Playlists", icon: <PlaylistPlay />, path: "/playlists" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#1a1a1a", // Use your preferred color
          color: "#fff", // Text color for the sidebar
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ padding: 2, backgroundColor: "#333", borderRadius: 2 }}>
        {/* <List>
          {menuItems.map((item, index) => {
            return (
              <ListItem button component="li" key={index} onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#fff" }} />
              </ListItem>

            );
          })}
        </List> */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
