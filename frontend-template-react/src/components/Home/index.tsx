// src/components/Home.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Homepage: React.FC = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Welcome to My App
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Box>
  );
};

export default Homepage;
