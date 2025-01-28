import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion'; // Framer motion for animations
import { useNavigate } from 'react-router-dom'; // For navigating to create playlist page

const PlaylistComponent: React.FC = () => {
  const navigate = useNavigate();

  // Mocked list of playlists
  const [playlists, setPlaylists] = useState<string[]>([]); // Initially no playlists

  // Handle navigating to the create playlist page
  const handleCreatePlaylist = () => {
    navigate('/create-playlist');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        My Playlists
      </Typography>

      {playlists.length > 0 ? (
        // If user has playlists, show them
        <Box>
          {playlists.map((playlist, index) => (
            <Card key={index} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{playlist}</Typography>
                {/* Add other playlist details if needed */}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // If no playlists exist, show an animated button to create one
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              display: 'block',
              margin: 'auto',
            }}
            onClick={handleCreatePlaylist}
          >
            Create Playlist
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default PlaylistComponent;
