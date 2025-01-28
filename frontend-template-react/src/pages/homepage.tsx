// src/components/Home.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import SongList from "../components/Songslist";

const Homepage: React.FC = () => {
  return (

    <Box textAlign="center" mt={5}>
     
      <SongList />
      
      
    </Box>
  );
};

export default Homepage;
