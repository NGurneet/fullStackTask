import { Box, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";
import theme from "../theme";
import Navbar from "../components/Navbar";
import Header from "../components/Header";



const Basic = () => {
  
  
  return (
    <Box >
        {/* <Header title="My App"/> */}
    <Navbar/>
      <Outlet />
    </Box>
  );
};

export default Basic;