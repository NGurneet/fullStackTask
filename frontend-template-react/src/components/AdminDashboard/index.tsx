import React, { Suspense, lazy } from 'react';
import { Box, IconButton, Typography, Button, Skeleton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion'; // Importing framer-motion for animation
import { useNavigate } from 'react-router-dom'; // To handle navigation

// Lazy load the SongList component
const SongList = lazy(() => import('../Songslist'));

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigate to /upload route when the button is clicked
  const handleAddSongClick = () => {
    navigate("/upload");
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          flexGrow: 1,
          padding: '16px',
          backgroundColor: '#f0f0f0',
          overflowY: 'auto',
        }}
      >
        {/* Toggle Button */}
        <IconButton
          edge="start"
          color="inherit"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1201,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Songs List
        </Typography>

        {/* Animate the "Add Song" Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}  // Initial small scale with no opacity
          animate={{ opacity: 1, scale: 1 }}   // Final full size with full opacity
          transition={{ type: "spring", stiffness: 150 }}  // Add smooth spring transition
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
            }}
            onClick={handleAddSongClick}
          >
            Add Song
          </Button>
        </motion.div>

        {/* Lazy Loaded SongList with Suspense & Skeleton Fallback */}
        <Suspense
          fallback={
            <Box sx={{ padding: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginBottom: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginBottom: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginBottom: 2 }} />
            </Box>
          }
        >
          <SongList />
        </Suspense>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
