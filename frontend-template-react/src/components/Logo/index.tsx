import React from "react";
import { Typography } from "@mui/material";

const Logo: React.FC = () => {
  return (
    <Typography
      variant="h6"
      component="div"
      sx={{
        flexGrow: 1,
        
        cursor: "pointer",
        color: "#ffcc00", // Highlight color
      }}
    >
      MyApp
    </Typography>
  );
};

export default Logo;
