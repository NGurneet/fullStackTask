import { Box, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";

import PublicNavbar from "../components/publicNavbar";



const PublicElements = () => {
  
  
  return (
    <Box >
        {/* <Header title="My App"/> */}
    <PublicNavbar/>
      <Outlet />
    </Box>
  );
};

export default PublicElements;