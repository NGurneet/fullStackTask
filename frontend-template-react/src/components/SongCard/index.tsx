import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion } from 'framer-motion';

interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    songUrl: string;
  };
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} // Smooth fade-in effect
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack vertically
          backgroundColor: theme.palette.background.default, // Use background color from theme
          borderRadius: 8,
          boxShadow: 3,
          overflow: 'hidden',
          position: 'relative', // Enable position for play button
          '&:hover': {
            boxShadow: 10, // Increase shadow on hover
            transform: 'scale(1.05)', // Slightly scale up
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          },
        }}
      >
        {/* Image container */}
        <Box
          sx={{
            width: '100%',
            height: 250, // Increased size for image
            position: 'relative', // Position play button over the image
            overflow: 'hidden',
          }}
        >
          <motion.img
            src="/images/song-cover.jpg"
            alt={song.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the area without distortion
            }}
            whileHover={{ scale: 1.05 }} // Image zoom effect on hover
            transition={{ duration: 0.3 }} // Smooth transition for hover effect
          />

          {/* Play button at intersection of image and text */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%', // Place it in the vertical center
              left: '50%',
              transform: 'translate(-50%, -50%)', // Align it perfectly at the center
              backgroundColor: 'white',
              padding: 1,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                transition: 'background-color 0.3s ease',
              },
            }}
          >
            <IconButton
              aria-label="play"
              sx={{
                color: theme.palette.primary.main, // Primary color for the play button
              }}
            >
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Song details container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              component="div"
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
            >
              {song.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {song.artist}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </motion.div>
  );
};

export default SongCard;
