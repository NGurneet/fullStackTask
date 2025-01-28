// src/components/Header.tsx
import React from "react";
import { Box, Typography, Container, Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion"; // Import motion for animation

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const theme = useTheme(); // Use the theme to access color values

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default, // Set background to the default background color of theme
          color: "#fff", // White text color for the background contrast
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: 4,
        }}
      >
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography 
                variant="h4" 
                sx={{
                  fontWeight: "bold", 
                  color: theme.palette.primary.main, // Set text color to secondary color from theme
                }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              {/* Optional: You can add a logo here */}
              {/* <img src="/logo.png" alt="Logo" style={{ height: 40 }} /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Header;
