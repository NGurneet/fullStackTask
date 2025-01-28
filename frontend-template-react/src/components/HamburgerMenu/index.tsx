import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const HamburgerMenu: React.FC = () => {
  return (
    <IconButton
      edge="end"
      color="inherit"
      aria-label="menu"
      sx={{ display: { sm: "none" }, color: "#ffcc00" }} // Highlight color for icon
    >
      <MenuIcon />
    </IconButton>
  );
};

export default HamburgerMenu;
